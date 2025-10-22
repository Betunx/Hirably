# Hirably Chatbot Backend

Backend API para el chatbot de Hirably con integración a Claude AI (Anthropic).

## Instalación

```bash
cd chatbot-backend
npm install
```

## Configuración

1. Crea un archivo `.env` en esta carpeta:
```bash
cp .env.example .env
```

2. Edita `.env` y agrega tu API key de Anthropic:
```
ANTHROPIC_API_KEY=tu_api_key_aqui
```

Para obtener tu API key:
- Visita https://console.anthropic.com/
- Crea una cuenta o inicia sesión
- Ve a "API Keys" y genera una nueva key

## Uso

### Modo desarrollo (con auto-reload):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints

### `GET /api/health`
Health check del servidor.

**Respuesta:**
```json
{
  "status": "ok",
  "message": "Chatbot backend is running",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

### `POST /api/chat`
Endpoint principal para enviar mensajes al chatbot.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hola, ¿qué servicios ofrece Hirably?" }
  ]
}
```

**Response:**
```json
{
  "message": "¡Hola! Hirably ofrece servicios de...",
  "usage": {
    "input_tokens": 45,
    "output_tokens": 120
  }
}
```

## Estructura del Proyecto

```
chatbot-backend/
├── server.js          # Servidor Express principal
├── package.json       # Dependencias
├── .env              # Variables de ambiente (no se commitea)
├── .env.example      # Ejemplo de configuración
├── .gitignore        # Archivos ignorados por git
└── README.md         # Este archivo
```

## Seguridad

- La API key NUNCA debe ser commiteada al repositorio
- `.env` está incluido en `.gitignore`
- CORS está configurado solo para `localhost:4200`
- Rate limiting está manejado por Anthropic API

## Troubleshooting

### Error: "API key not configured"
- Verifica que el archivo `.env` existe
- Verifica que `ANTHROPIC_API_KEY` tiene un valor válido
- Reinicia el servidor después de editar `.env`

### Error: "Rate limit exceeded"
- Has alcanzado el límite de peticiones de tu plan de Anthropic
- Espera unos minutos antes de hacer más peticiones

### Error de CORS
- Verifica que Angular está corriendo en `http://localhost:4200`
- Si usas otro puerto, actualiza el array `origin` en `server.js`
