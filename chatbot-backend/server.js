/**
 * HIRABLY CHATBOT BACKEND
 * Express server que maneja las peticiones al API de Claude AI
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CONFIGURACIÓN DE MIDDLEWARE
// ============================================

// CORS habilitado para Angular dev server
app.use(cors({
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Parser de JSON
app.use(express.json({ limit: '10mb' }));

// ============================================
// INICIALIZACIÓN DE CLAUDE API
// ============================================

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// System prompt que define la personalidad del bot
const SYSTEM_PROMPT = `Eres un asistente virtual de Hirably, una plataforma que conecta empresas con talento mexicano altamente calificado.

Tu personalidad:
- Profesional pero amigable
- Conoces perfectamente los servicios de Hirably
- Ayudas a responder preguntas sobre contratación, costos, procesos
- Eres conciso pero informativo
- Hablas principalmente en español

Servicios de Hirably:
- Reclutamiento y selección de talento tech mexicano
- Roles: Desarrolladores, Diseñadores, Product Managers, QA Engineers
- Proceso de 4 pasos: Consulta → Búsqueda → Entrevistas → Contratación
- Ventajas: Talento calificado, zona horaria compatible, costos competitivos

Si te preguntan algo que no sabes, sé honesto y ofrece alternativas de contacto.`;

// ============================================
// ENDPOINTS
// ============================================

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Chatbot backend is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * Endpoint principal de chat
 * Recibe el historial de mensajes y devuelve la respuesta de Claude
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    // Validación de entrada
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Messages array is required and must not be empty'
      });
    }

    // Validar que la API key existe
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('❌ ANTHROPIC_API_KEY no está configurada en .env');
      return res.status(500).json({
        error: 'API key not configured. Please set ANTHROPIC_API_KEY in .env file'
      });
    }

    console.log('📨 Recibiendo petición de chat...');
    console.log(`   Mensajes en historial: ${messages.length}`);
    console.log(`   Último mensaje: "${messages[messages.length - 1].content.substring(0, 50)}..."`);

    // Llamada a Claude API
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages
    });

    // Extraer el texto de la respuesta
    const assistantMessage = response.content[0].text;

    console.log('✅ Respuesta de Claude recibida');
    console.log(`   Longitud: ${assistantMessage.length} caracteres`);
    console.log(`   Tokens usados: input=${response.usage.input_tokens}, output=${response.usage.output_tokens}`);

    // Enviar respuesta al frontend
    res.json({
      message: assistantMessage,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens
      }
    });

  } catch (error) {
    console.error('❌ Error en /api/chat:', error.message);

    // Manejo específico de errores de Anthropic
    if (error.status === 401) {
      return res.status(401).json({
        error: 'Invalid API key. Please check your ANTHROPIC_API_KEY'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again later'
      });
    }

    if (error.status === 400) {
      return res.status(400).json({
        error: 'Invalid request format: ' + error.message
      });
    }

    // Error genérico
    res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ============================================
// MANEJO DE ERRORES Y 404
// ============================================

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('💥 Error no manejado:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================
// INICIO DEL SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log('\n🚀 ========================================');
  console.log(`   HIRABLY CHATBOT BACKEND`);
  console.log('   ========================================');
  console.log(`   🌐 Server running on http://localhost:${PORT}`);
  console.log(`   🔑 API Key configured: ${process.env.ANTHROPIC_API_KEY ? '✅ Yes' : '❌ No'}`);
  console.log(`   📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('   ========================================\n');

  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠️  WARNING: ANTHROPIC_API_KEY not found in .env file!');
    console.warn('   Create a .env file with: ANTHROPIC_API_KEY=your_key_here\n');
  }
});
