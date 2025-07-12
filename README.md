# Biblionauta 📚

Biblionauta es una aplicación móvil desarrollada con React Native y Expo, diseñada para proporcionar una experiencia moderna y eficiente en la gestión y exploración de libros.

## 🚀 Tecnologías Principales

- **React Native** (v0.79.2)
- **Expo** (v53.0.6)
- **TypeScript**
- **Expo Router** (v5.0.7)
- **NativeWind** (v4.1.23) / **TailwindCSS** (v3.4.17)

## 📋 Prerrequisitos

- Node.js (versión LTS recomendada)
- Bun (gestor de paquetes)
- Expo CLI
- Android Studio

## 🛠️ Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/David-Josue-Murillo/biblionauta.git
cd biblionauta
```

2. Instalar dependencias:

```bash
bun install
```

3. Iniciar el proyecto:

```bash
bun start
```

## 🔗 Trabajando con el Repositorio Remoto

### Conectarse al Repositorio

1. **Verificar la conexión remota:**

```bash
git remote -v
```

Deberías ver:

```
origin  https://github.com/David-Josue-Murillo/biblionauta.git (fetch)
origin  https://github.com/David-Josue-Murillo/biblionauta.git (push)
```

2. **Configurar tu identidad (si es la primera vez):**

```bash
git config user.name "Tu Nombre"
git config user.email "tu-email@ejemplo.com"
```

3. **Obtener la última versión:**

```bash
git fetch origin
git checkout main
git pull origin main
```

### Hacer Commits

1. **Verificar el estado del repositorio:**

```bash
git status
```

2. **Agregar archivos al staging:**

```bash
# Archivos específicos
git add nombre-del-archivo.tsx

# Todos los cambios
git add .
```

3. **Hacer commit siguiendo Conventional Commits:**

```bash
git commit -m "tipo(alcance): descripción breve"
```

**Ejemplos de commits:**

- `feat(auth): agregando login con google`
- `fix(books): resolviendo problema de paginación`
- `docs(readme): actualizando pasos de instalación`
- `refactor(components): optimizando renderizado de lista`
- `test(utils): agregando pruebas para funciones de validación`

4. **Subir cambios:**

```bash
git push origin main
```

### Crear Pull Requests

1. **Crear rama para tu trabajo:**

```bash
git checkout main
git pull origin main
git checkout -b feature/nombre-de-tu-feature
```

2. **Hacer cambios y commits:**

```bash
# Hacer cambios en archivos
git add .
git commit -m "feat(componente): agregando nueva funcionalidad"
```

3. **Subir rama al repositorio:**

```bash
git push origin feature/nombre-de-tu-feature
```

4. **Crear PR en GitHub:**
   - Ve a [https://github.com/David-Josue-Murillo/biblionauta](https://github.com/David-Josue-Murillo/biblionauta)
   - Haz clic en "Compare & pull request" o "New pull request"
   - Usa el título: `feat(alcance): descripción breve`
   - Completa la descripción del PR

**Plantilla para descripción del PR:**

```markdown
## Descripción

Breve descripción de los cambios realizados.

## Cambios realizados

- [ ] Cambio 1
- [ ] Cambio 2
- [ ] Cambio 3

## Tipo de cambio

- [ ] Nueva característica (feature)
- [ ] Corrección de bug (fix)
- [ ] Refactorización (refactor)
- [ ] Documentación (docs)
```

### Comandos Útiles

```bash
# Ver historial de commits
git log --oneline

# Ver diferencias antes de commit
git diff

# Descartar cambios en un archivo
git checkout -- nombre-del-archivo

# Cambiar de rama
git checkout nombre-de-rama

# Ver todas las ramas
git branch -a

# Eliminar rama local después del merge
git branch -d nombre-de-rama
```

## 📱 Scripts Disponibles

- `bun start` - Inicia el servidor de desarrollo de Expo
- `bun android` - Inicia la aplicación en un emulador Android
- `bun ios` - Inicia la aplicación en un simulador iOS
- `bun web` - Inicia la aplicación en modo web

## 🏗️ Estructura del Proyecto

```
biblionauta/
├── app/                # Directorio principal de la aplicación (Expo Router)
├── assets/             # Recursos estáticos (imágenes, fuentes, etc.)
├── src/                # Código fuente adicional
├── .expo/              # Configuración de Expo
├── node_modules/       # Dependencias
└── [archivos de configuración]
```

## 🎨 Estilos y UI

El proyecto utiliza NativeWind (TailwindCSS para React Native) para el estilizado de componentes. La configuración se encuentra en:

- `tailwind.config.js`
- `global.css`

## 🔧 Configuración de Desarrollo

El proyecto utiliza TypeScript para un desarrollo más robusto. La configuración de TypeScript se encuentra en `tsconfig.json`.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribución

### Flujo de Trabajo

1. Asegúrate de tener la última versión del repositorio:

```bash
git fetch origin
git checkout main
git pull origin main
```

2. Crea una nueva rama siguiendo la convención de nombres:

```bash
git checkout -b tipo/nombre-descripcion
```

Donde `tipo` puede ser:

- `feature/` - Para nuevas características
- `fix/` - Para correcciones de errores
- `refactor/` - Para refactorizaciones
- `docs/` - Para cambios en documentación
- `test/` - Para pruebas
- `chore/` - Para tareas de mantenimiento

3. Desarrolla tus cambios siguiendo las buenas prácticas:
   - Escribe código limpio y legible
   - Sigue los estándares de código del proyecto
   - Añade comentarios cuando sea necesario
   - Escribe pruebas para nuevas funcionalidades
   - Actualiza la documentación si es necesario

4. Realiza commits siguiendo el formato de Conventional Commits:

```bash
git commit -m "tipo(alcance): descripción breve"
```

Ejemplos:

- `feat(auth): agregando login con google`
- `fix(books): resolviendo problema de paginación`
- `docs(readme): actualizando pasos de instalación`

5. Mantén tu rama actualizada:

```bash
git fetch origin
git rebase origin/main
```

6. Resuelve conflictos si existen durante el rebase

7. Push de tus cambios:

```bash
git push origin tipo/nombre-descripcion
```

8. Crea un Pull Request hacia la rama `main`:
   - Usa la plantilla de PR proporcionada
   - Describe claramente los cambios realizados
   - Menciona los issues relacionados (si existen)
   - Solicita revisión de al menos un mantenedor

### Buenas Prácticas

- **Commits**:
  - Haz commits pequeños y frecuentes
  - Cada commit debe representar un cambio lógico y completo
  - Usa mensajes de commit descriptivos

- **Código**:
  - Documenta funciones y componentes complejos
  - Usa TypeScript

- **Pull Requests**:
  - Mantén los PRs pequeños y enfocados
  - Responde a los comentarios de revisión
  - Actualiza tu PR según el feedback

- **Revisión de Código**:
  - Revisa el código de otros contribuidores
  - Proporciona feedback constructivo
  - Verifica que los cambios cumplan con los estándares
