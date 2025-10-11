# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

## [0.2.1] - 2025-10-11

### Mejorado
- **Mensaje de encuesta más informativo**: Agregado texto explicativo sobre la opción de enviar comentarios después de calificar
- Mejora en UX: Los usuarios ahora saben que pueden compartir feedback adicional después de seleccionar su calificación

### Cambios técnicos
- `nodes/EncuestaCapiBobba/EncuestaCapiBobba.node.ts:83`: Actualizado mensaje del cuerpo de la encuesta con texto adicional sobre comentarios opcionales

## [0.2.0] - 2025-10-04

### Agregado
- **Sistema completo de encuestas de satisfacción**: Nodo funcional para n8n que envía encuestas interactivas por WhatsApp
- Integración con WhatsApp Cloud API usando mensajes interactivos (list messages)
- Credenciales personalizadas `WhatsAppApi.credentials` para autenticación
- Parámetros configurables:
  - `phoneNumber`: Número de teléfono del cliente (requerido)
  - `fecha`: Fecha del pedido para personalización del mensaje

### Características
- Encuesta predefinida con opciones de 1 a 5 estrellas (⭐)
- Mensaje personalizado con marca CapiBobba (💜)
- Botón interactivo "Calificar ⭐"
- Manejo robusto de errores y validaciones
- Compatible con n8n API version 1

### Técnico
- TypeScript 4.8.4
- n8n-core y n8n-workflow 1.45.0
- ESLint con reglas específicas para nodos de n8n
- Build automatizado con prepublishOnly hook
- Estructura de archivos optimizada para publicación npm

## [0.1.0] - 2025-09-XX

### Agregado
- Configuración inicial del proyecto
- Estructura básica del nodo
- Credenciales de WhatsApp API
- Scripts de desarrollo y build
- Configuración de TypeScript y ESLint

---

## Formato de Versiones

- **MAJOR** (X.0.0): Cambios incompatibles con versiones anteriores
- **MINOR** (0.X.0): Nueva funcionalidad compatible con versiones anteriores
- **PATCH** (0.0.X): Correcciones de bugs y mejoras menores

## Enlaces

- [Repositorio en npm](https://www.npmjs.com/package/n8n-nodes-encuestacapibobba)
- [Documentación de n8n](https://docs.n8n.io/)
- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/)
