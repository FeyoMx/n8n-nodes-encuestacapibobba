# Guía de Publicación a npm - n8n-nodes-encuestacapibobba

## 📋 Requisitos Previos

Antes de publicar el paquete a npm, asegúrate de cumplir con los siguientes requisitos:

### 1. Cuenta de npm
- Tener una cuenta en [npmjs.com](https://www.npmjs.com/)
- Verificar el correo electrónico de la cuenta
- Configurar autenticación de dos factores (recomendado)

### 2. Autenticación Local
```bash
# Login en npm (ejecutar en terminal)
npm login

# Verificar usuario autenticado
npm whoami
```

### 3. Permisos de Publicación
- Debes tener permisos para publicar el paquete `n8n-nodes-encuestacapibobba`
- Si es la primera publicación, el nombre debe estar disponible en npm registry

### 4. Build Exitoso
- El proyecto debe compilarse sin errores
- Todos los tests deben pasar (si existen)
- Linting debe pasar correctamente

## 🚀 Proceso de Publicación

### Paso 1: Verificar el Estado Actual

```bash
# Cambiar al directorio del nodo
cd n8n-nodes-encuestacapibobba

# Verificar que no hay cambios sin commitear
git status

# Verificar la versión actual en package.json
cat package.json | grep version

# Verificar que el build existe y es reciente
ls -la dist/
```

### Paso 2: Ejecutar el Build

```bash
# Compilar el proyecto
npm run build

# Verificar que no hay errores
echo $?  # Debe retornar 0
```

### Paso 3: Verificar el Contenido del Paquete

```bash
# Ver qué archivos se incluirán en la publicación
npm pack --dry-run

# Esto debe mostrar:
# - dist/ (archivos compilados)
# - package.json
# - README.md
# - CHANGELOG.md (si existe)
```

### Paso 4: Validación Pre-Publicación

El script `prepublishOnly` se ejecutará automáticamente y validará:
- Build exitoso
- Linting sin errores críticos

Si falla, corrige los problemas antes de continuar.

### Paso 5: Publicar a npm

```bash
# Publicar el paquete (primera vez o actualizaciones)
npm publish

# Si es un paquete privado (no es nuestro caso):
# npm publish --access restricted

# Si es un paquete público (nuestro caso):
# npm publish --access public
```

**Nota**: Si recibes error de permisos o el nombre ya existe, necesitarás usar un scope:
```bash
npm publish --access public --scope=@tu-usuario
```

### Paso 6: Verificar la Publicación

```bash
# Verificar que el paquete está publicado
npm info n8n-nodes-encuestacapibobba

# Verificar la versión publicada
npm view n8n-nodes-encuestacapibobba version

# Ver todas las versiones publicadas
npm view n8n-nodes-encuestacapibobba versions
```

### Paso 7: Probar la Instalación

```bash
# En un directorio temporal
mkdir test-install && cd test-install

# Instalar el paquete publicado
npm init -y
npm install n8n-nodes-encuestacapibobba

# Verificar que se instaló correctamente
ls node_modules/n8n-nodes-encuestacapibobba/
```

## 📝 Checklist de Publicación

Antes de ejecutar `npm publish`, verifica:

- [ ] ✅ Versión actualizada en `package.json` (seguir semver)
- [ ] ✅ `CHANGELOG.md` actualizado con cambios de la nueva versión
- [ ] ✅ Build exitoso (`npm run build`)
- [ ] ✅ Linting pasado (`npm run lint` o prepublishOnly)
- [ ] ✅ Cambios commiteados en git
- [ ] ✅ Tag de versión creado en git (opcional pero recomendado)
- [ ] ✅ README.md actualizado (si hay cambios en uso)
- [ ] ✅ Login en npm (`npm whoami`)
- [ ] ✅ Permisos de publicación verificados

## 🏷️ Tagging de Versiones en Git

Es buena práctica crear tags en git para cada versión publicada:

```bash
# Crear un tag para la versión actual
git tag v0.2.1

# O con mensaje descriptivo
git tag -a v0.2.1 -m "Release v0.2.1: Mejora mensaje de encuesta"

# Subir el tag al repositorio remoto
git push origin v0.2.1

# O subir todos los tags
git push origin --tags
```

## 🔄 Actualizar Versión para Siguiente Release

Después de publicar, prepara el repositorio para la siguiente versión:

```bash
# Opción 1: Actualizar manualmente package.json

# Opción 2: Usar npm version (automático)
npm version patch   # 0.2.1 -> 0.2.2 (bug fixes)
npm version minor   # 0.2.1 -> 0.3.0 (nuevas features compatibles)
npm version major   # 0.2.1 -> 1.0.0 (breaking changes)

# npm version crea automáticamente:
# - Actualiza package.json
# - Commitea el cambio
# - Crea un tag de git
```

## 🐛 Troubleshooting

### Error: "You do not have permission to publish"
**Solución**: Verifica que estás logueado con la cuenta correcta (`npm whoami`) y que tienes permisos sobre el paquete.

### Error: "Package name already exists"
**Solución**: El nombre `n8n-nodes-encuestacapibobba` ya está tomado por otro usuario. Opciones:
1. Usar un scope: `@tu-usuario/n8n-nodes-encuestacapibobba`
2. Cambiar el nombre del paquete

### Error: "npm ERR! 402 Payment Required"
**Solución**: Estás intentando publicar un paquete privado sin cuenta premium. Usa `--access public`.

### Error: "prepublishOnly script failed"
**Solución**: Corrige los errores de linting o build antes de publicar.

### Build falla con errores de TypeScript
**Solución**:
```bash
# Limpiar node_modules e instalar de nuevo
rm -rf node_modules package-lock.json
npm install

# Verificar versión de TypeScript
npx tsc --version

# Ejecutar build de nuevo
npm run build
```

## 📊 Monitoreo Post-Publicación

Después de publicar, monitorea:

1. **Descargas en npm**:
   - Visita: https://www.npmjs.com/package/n8n-nodes-encuestacapibobba
   - Estadísticas de descargas semanales/mensuales

2. **Issues reportados**:
   - Monitorear problemas en el repositorio de GitHub
   - Responder preguntas de usuarios

3. **Actualizaciones de n8n**:
   - Verificar compatibilidad con nuevas versiones de n8n
   - Actualizar dependencias si es necesario

## 🔒 Seguridad

**IMPORTANTE**:
- ❌ **NUNCA** incluir credenciales, tokens o API keys en el paquete
- ❌ **NUNCA** publicar archivos `.env` o con datos sensibles
- ✅ Verificar que `.gitignore` excluye archivos sensibles
- ✅ Usar `files` en `package.json` para controlar qué se publica
- ✅ Revisar contenido con `npm pack --dry-run` antes de publicar

## 📚 Referencias

- [npm Publishing Documentation](https://docs.npmjs.com/cli/v9/commands/npm-publish)
- [Semantic Versioning (semver)](https://semver.org/)
- [n8n Community Nodes Guide](https://docs.n8n.io/integrations/creating-nodes/)
- [Creating n8n Nodes](https://docs.n8n.io/integrations/creating-nodes/build/)

---

**Versión de esta guía**: 1.0.0
**Última actualización**: 2025-10-11
**Paquete**: n8n-nodes-encuestacapibobba v0.2.1
