/**
 * CHATBOT COMPONENT
 * Componente standalone que muestra un chatbot flotante integrado con Claude AI
 */

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ChatbotService, ChatMessage } from '@services/chatbot.service';

// ============================================
// COMPONENTE
// ============================================

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {

  // ============================================
  // PROPIEDADES
  // ============================================

  /**
   * Controla si la ventana del chat está abierta o cerrada
   */
  isOpen = false;

  /**
   * Mensaje que el usuario está escribiendo
   */
  userInput = '';

  /**
   * Lista de mensajes de la conversación
   */
  messages: ChatMessage[] = [];

  /**
   * Indica si el bot está escribiendo una respuesta
   */
  isTyping = false;

  /**
   * Mensaje de error (si existe)
   */
  errorMessage: string | null = null;

  /**
   * Límite de caracteres por mensaje
   */
  readonly MAX_CHARS = 500;

  /**
   * Indica si hay mensajes sin leer (para badge de notificación)
   */
  hasUnreadMessages = false;

  /**
   * Referencia al contenedor de mensajes para auto-scroll
   */
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  /**
   * Flag para controlar el auto-scroll
   */
  private shouldScrollToBottom = false;

  /**
   * Subject para manejar la limpieza de suscripciones
   */
  private destroy$ = new Subject<void>();

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(
    private chatbotService: ChatbotService,
    private cdr: ChangeDetectorRef
  ) {}

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  ngOnInit(): void {
    console.log('🤖 Chatbot component inicializado');

    // Suscribirse a cambios en los mensajes
    this.chatbotService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe(messages => {
        this.messages = messages;
        this.shouldScrollToBottom = true;

        // Si la ventana está cerrada y llega un mensaje del bot, marcar como no leído
        if (!this.isOpen && messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
          this.hasUnreadMessages = true;
        }

        this.cdr.markForCheck();
      });

    // Suscribirse al estado de "escribiendo"
    this.chatbotService.isTyping$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isTyping => {
        this.isTyping = isTyping;
        if (isTyping) {
          this.shouldScrollToBottom = true;
        }
        this.cdr.markForCheck();
      });

    // Suscribirse a errores
    this.chatbotService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.errorMessage = error;
        this.cdr.markForCheck();
      });

    // Verificar salud del backend al inicio
    this.checkBackendHealth();
  }

  ngAfterViewChecked(): void {
    // Auto-scroll después de que la vista se actualiza
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones
    this.destroy$.next();
    this.destroy$.complete();
    console.log('🤖 Chatbot component destruido');
  }

  // ============================================
  // MÉTODOS PÚBLICOS
  // ============================================

  /**
   * Abre o cierra la ventana del chat
   */
  toggleChat(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.hasUnreadMessages = false;
      this.shouldScrollToBottom = true;

      // Si es la primera vez que se abre, enviar mensaje de bienvenida
      if (this.messages.length === 0) {
        this.sendWelcomeMessage();
      }
    }

    console.log(`💬 Chat ${this.isOpen ? 'abierto' : 'cerrado'}`);
  }

  /**
   * Envía el mensaje del usuario al bot
   */
  sendMessage(): void {
    const message = this.userInput.trim();

    // Validaciones
    if (!message) {
      return;
    }

    if (message.length > this.MAX_CHARS) {
      this.errorMessage = `El mensaje no puede exceder ${this.MAX_CHARS} caracteres`;
      return;
    }

    if (this.isTyping) {
      console.warn('⏳ Ya hay un mensaje siendo procesado');
      return;
    }

    console.log('📤 Enviando mensaje:', message);

    // Limpiar input
    this.userInput = '';
    this.errorMessage = null;

    // Enviar mensaje al servicio
    this.chatbotService.sendMessage(message)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('✅ Respuesta recibida');
          this.shouldScrollToBottom = true;
        },
        error: (error) => {
          console.error('❌ Error al enviar mensaje:', error.message);
          // El error ya está manejado por el servicio
        }
      });
  }

  /**
   * Maneja el evento de presionar Enter en el textarea
   */
  onKeyDown(event: KeyboardEvent): void {
    // Enter sin Shift = enviar mensaje
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
    // Shift + Enter = nueva línea (comportamiento por defecto)
  }

  /**
   * Limpia el historial de conversación
   */
  clearConversation(): void {
    if (confirm('¿Estás seguro de que quieres limpiar la conversación?')) {
      this.chatbotService.clearConversation();
      this.errorMessage = null;
      console.log('🗑️ Conversación limpiada');

      // Enviar nuevo mensaje de bienvenida
      setTimeout(() => {
        this.sendWelcomeMessage();
      }, 300);
    }
  }

  /**
   * Cierra el mensaje de error
   */
  dismissError(): void {
    this.errorMessage = null;
  }

  /**
   * Obtiene el contador de caracteres restantes
   */
  get remainingChars(): number {
    return this.MAX_CHARS - this.userInput.length;
  }

  /**
   * Verifica si el contador debe mostrarse en rojo (cerca del límite)
   */
  get isNearLimit(): boolean {
    return this.remainingChars < 50;
  }

  /**
   * Formatea la hora de un mensaje
   */
  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // ============================================
  // MÉTODOS PRIVADOS
  // ============================================

  /**
   * Hace scroll automático hasta el último mensaje
   */
  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (error) {
      console.error('Error al hacer scroll:', error);
    }
  }

  /**
   * Verifica que el backend esté disponible
   */
  private checkBackendHealth(): void {
    this.chatbotService.checkHealth()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('✅ Backend conectado');
        },
        error: (error) => {
          console.error('❌ Backend no disponible:', error.message);
          this.errorMessage = 'No se pudo conectar al servidor. Asegúrate de que el backend esté corriendo.';
          this.cdr.markForCheck();
        }
      });
  }

  /**
   * Envía un mensaje de bienvenida automático
   */
  private sendWelcomeMessage(): void {
    // Simular mensaje de bienvenida del asistente
    const welcomeMessage: ChatMessage = {
      role: 'assistant',
      content: '¡Hola! 👋 Soy el asistente virtual de Hirably. Estoy aquí para ayudarte con cualquier pregunta sobre nuestros servicios de reclutamiento de talento mexicano. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    };

    // Agregar mensaje directamente sin llamar al API
    const currentMessages = this.chatbotService.getMessages();
    this.messages = [...currentMessages, welcomeMessage];
    this.shouldScrollToBottom = true;
    this.cdr.markForCheck();
  }
}
