/**
 * CHATBOT SERVICE
 * Servicio que maneja la comunicación con el backend del chatbot
 * y gestiona el estado de la conversación
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

// ============================================
// INTERFACES
// ============================================

/**
 * Estructura de un mensaje en el chat
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Respuesta del backend
 */
interface ChatResponse {
  message: string;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
}

/**
 * Error response del backend
 */
interface ErrorResponse {
  error: string;
  details?: string;
}

// ============================================
// SERVICIO
// ============================================

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  // URL del backend (ajustar según tu configuración)
  private readonly API_URL = 'http://localhost:3000/api';

  // Timeout para las peticiones (30 segundos)
  private readonly REQUEST_TIMEOUT = 30000;

  // ============================================
  // ESTADO DEL CHAT
  // ============================================

  /**
   * Historial completo de mensajes
   * BehaviorSubject permite que los componentes se suscriban a cambios
   */
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  /**
   * Estado de "escribiendo..."
   * true cuando el bot está procesando una respuesta
   */
  private typingSubject = new BehaviorSubject<boolean>(false);
  public isTyping$ = this.typingSubject.asObservable();

  /**
   * Estado de error
   * Muestra el último error ocurrido
   */
  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  // ============================================
  // CONSTRUCTOR
  // ============================================

  constructor(private http: HttpClient) {
    console.log('💬 ChatbotService inicializado');
  }

  // ============================================
  // MÉTODOS PÚBLICOS
  // ============================================

  /**
   * Obtiene el historial actual de mensajes
   */
  getMessages(): ChatMessage[] {
    return this.messagesSubject.value;
  }

  /**
   * Envía un mensaje del usuario y obtiene respuesta del bot
   * @param content Contenido del mensaje del usuario
   */
  sendMessage(content: string): Observable<ChatMessage> {
    // Validación básica
    if (!content || content.trim().length === 0) {
      return throwError(() => new Error('El mensaje no puede estar vacío'));
    }

    // Crear mensaje del usuario
    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    // Agregar mensaje del usuario al historial
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, userMessage]);

    // Activar estado "escribiendo..."
    this.typingSubject.next(true);
    this.errorSubject.next(null);

    // Preparar mensajes para el API (formato Anthropic)
    const apiMessages = this.messagesSubject.value.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    console.log('📤 Enviando mensaje al backend:', content.substring(0, 50) + '...');

    // Hacer petición HTTP al backend
    return this.http.post<ChatResponse>(`${this.API_URL}/chat`, {
      messages: apiMessages
    }).pipe(
      timeout(this.REQUEST_TIMEOUT),
      map(response => {
        // Crear mensaje del asistente
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: response.message,
          timestamp: new Date()
        };

        // Agregar respuesta al historial
        const updatedMessages = this.messagesSubject.value;
        this.messagesSubject.next([...updatedMessages, assistantMessage]);

        // Desactivar estado "escribiendo..."
        this.typingSubject.next(false);

        console.log('📥 Respuesta recibida del bot');
        if (response.usage) {
          console.log(`   Tokens: ${response.usage.input_tokens} input, ${response.usage.output_tokens} output`);
        }

        return assistantMessage;
      }),
      catchError((error: HttpErrorResponse) => {
        this.typingSubject.next(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * Limpia el historial de conversación
   */
  clearConversation(): void {
    this.messagesSubject.next([]);
    this.errorSubject.next(null);
    console.log('🗑️ Conversación limpiada');
  }

  /**
   * Verifica si el backend está disponible
   */
  checkHealth(): Observable<boolean> {
    return this.http.get<any>(`${this.API_URL}/health`).pipe(
      timeout(5000),
      map(response => {
        console.log('✅ Backend disponible:', response.status);
        return true;
      }),
      catchError(error => {
        console.error('❌ Backend no disponible:', error.message);
        return throwError(() => new Error('Backend no disponible'));
      })
    );
  }

  /**
   * Obtiene estadísticas del chat actual
   */
  getChatStats(): { totalMessages: number; userMessages: number; botMessages: number } {
    const messages = this.messagesSubject.value;
    return {
      totalMessages: messages.length,
      userMessages: messages.filter(m => m.role === 'user').length,
      botMessages: messages.filter(m => m.role === 'assistant').length
    };
  }

  // ============================================
  // MÉTODOS PRIVADOS
  // ============================================

  /**
   * Maneja errores HTTP y los convierte en mensajes amigables
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente o de red
      errorMessage = `Error de conexión: ${error.error.message}`;
      console.error('❌ Error de cliente:', error.error.message);
    } else {
      // Error del backend
      console.error('❌ Error del servidor:', error.status, error.error);

      switch (error.status) {
        case 0:
          errorMessage = 'No se pudo conectar al servidor. Verifica que el backend esté corriendo en http://localhost:3000';
          break;
        case 400:
          errorMessage = error.error?.error || 'Petición inválida';
          break;
        case 401:
          errorMessage = 'API key inválida. Verifica la configuración del backend';
          break;
        case 429:
          errorMessage = 'Demasiadas peticiones. Por favor espera un momento';
          break;
        case 500:
          errorMessage = error.error?.error || 'Error interno del servidor';
          break;
        case 504:
          errorMessage = 'El servidor tardó demasiado en responder. Intenta de nuevo';
          break;
        default:
          errorMessage = `Error del servidor (${error.status}): ${error.error?.error || 'Error desconocido'}`;
      }
    }

    // Actualizar estado de error
    this.errorSubject.next(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
