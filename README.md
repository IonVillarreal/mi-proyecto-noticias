# Mi Proyecto Noticias

Este es un proyecto de ejemplo de una aplicación de noticias desarrollada con Next.js, TypeScript, y otras tecnologías modernas de desarrollo web.

## Características

- Desarrollado con Next.js 14 y React 18
- Tipado estático con TypeScript
- Gestión de formularios con React Hook Form y validación con Zod
- Interfaz de usuario con Material-UI (MUI)
- Manejo de estado del servidor con TanStack Query
- Autenticación y autorización
- Componentes de mapa interactivo con react-leaflet
- Optimización de rendimiento con lazy loading y importaciones dinámicas
- Panel de administración con DataGrid para gestión de noticias
- Ejemplos de Server-Side Rendering (SSR) y Client-Side Rendering (CSR)

## Estructura del Proyecto

El proyecto sigue la estructura de directorios del App Router de Next.js:

```
src/
├── app/
│   ├── admin/           # Panel de administración
│   ├── api/             # Rutas de API
│   ├── components/      # Componentes compartidos
│   ├── context/         # Contextos de React
│   ├── lib/             # Utilidades y helpers
│   ├── providers/       # Proveedores de React
│   ├── change-password-direct/    # Página de cambio de contraseña (importación directa)
│   ├── change-password-dynamic/   # Página de cambio de contraseña (importación dinámica)
│   ├── contact/         # Página de contacto con mapa
│   ├── datagrid-actions/    # Ejemplo de DataGrid con acciones
│   ├── datagrid-advanced/   # Ejemplo avanzado de DataGrid
│   ├── datagrid-example/    # Ejemplo básico de DataGrid
│   ├── infinite-posts/      # Ejemplo de carga infinita de posts
│   ├── lazy-loading/        # Ejemplo de carga perezosa de componentes
│   ├── login/               # Página de inicio de sesión
│   ├── news/                # Páginas relacionadas con noticias
│   ├── posts/               # Página de listado de posts
│   ├── posts-tanstack-query/    # Ejemplo de uso de TanStack Query con posts
│   ├── posts-use-effect/    # Ejemplo de carga de posts con useEffect
│   ├── layout.tsx           # Diseño principal de la aplicación
│   ├── page.tsx             # Página de inicio
│   └── globals.css          # Estilos globales
├── middleware.ts        # Middleware de Next.js
└── theme.ts             # Configuración del tema de MUI
```

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/IonVillarreal/mi-proyecto-noticias.git
   ```

2. Navega al directorio del proyecto:
   ```
   cd mi-proyecto-noticias
   ```

3. Instala las dependencias:
   ```
   npm install
   ```
   o
   ```
   yarn install
   ```

## Ejecución

Para ejecutar el proyecto en modo de desarrollo:

```
npm run dev
```

o

```
yarn dev
```

La aplicación estará disponible en `http://localhost:8080`.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo en el puerto 8080.
- `npm run build`: Construye la aplicación para producción.
- `npm run start`: Inicia el servidor de producción en el puerto 8080.
- `npm run lint`: Ejecuta el linter para verificar el código.

## Dependencias Principales

- Next.js (14.2.14): Framework de React para aplicaciones web.
- React (18) y React DOM (18): Biblioteca para construir interfaces de usuario.
- Material-UI (6.1.2): Biblioteca de componentes de React para un diseño rápido y fácil.
- TanStack Query (5.59.0): Biblioteca para gestionar el estado del servidor.
- React Hook Form (7.53.0): Librería para manejar formularios en React.
- Zod (3.23.8): Biblioteca de validación de esquemas para TypeScript.
- Leaflet (1.9.4) y React Leaflet (4.2.1): Para crear mapas interactivos.
- Axios (1.7.7): Cliente HTTP para realizar peticiones a APIs.
- js-cookie (3.0.5): Manejo sencillo de cookies en el navegador.
- zxcvbn-typescript (5.0.1): Librería para evaluar la fortaleza de contraseñas.

## Herramientas de Desarrollo

- TypeScript (5): Superset tipado de JavaScript.
- ESLint (8): Herramienta de linting para identificar y reportar patrones en JavaScript.
- @next/bundle-analyzer (14.2.15): Analizador de bundles para Next.js.

## Características Detalladas

1. **Panel de Administración**: Ubicado en `app/admin/`, permite la gestión de noticias con operaciones CRUD.

2. **Autenticación**: Implementada en `app/login/` y `app/context/AuthContext.tsx`.

3. **Cambio de Contraseña**: Dos implementaciones (directa y dinámica) para comparar rendimiento.

4. **Mapa Interactivo**: En la página de contacto, utilizando react-leaflet.

5. **DataGrid**: Varios ejemplos de uso del componente DataGrid de MUI.

6. **Carga Infinita**: Ejemplo de carga infinita de posts.

7. **Lazy Loading**: Demostración de carga perezosa de componentes.

8. **TanStack Query**: Ejemplos de uso para manejo eficiente del estado del servidor.

9. **SSR y CSR**: Ejemplos de renderizado en el servidor y en el cliente.

10. **Optimización de Rendimiento**: Uso de importaciones dinámicas y análisis de bundles.
