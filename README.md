# itx-test-react

Este proyecto es una aplicación de React que utiliza Vite como herramienta de construcción. A continuación se detallan las instrucciones para ejecutar el proyecto y otra información relevante.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/felipelabo/itx-test-react.git
   cd itx-test-react
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución del Proyecto

Para iniciar la aplicación en modo de desarrollo, ejecuta:
```bash
npm run dev
```
Esto abrirá la aplicación en `http://localhost:5173`.

## Construcción para Producción

Para crear una versión optimizada de la aplicación para producción, ejecuta:
```bash
npm run build
```
Los archivos generados se encontrarán en la carpeta `dist`.

## Estructura de Carpetas

La carpeta `src` contiene todos los componentes y recursos de la aplicación. A continuación se detalla la estructura:

```
src/
├── assets/                # Recursos estáticos como imágenes y SVGs.
├── components/            # Componentes reutilizables de la interfaz de usuario.
├── context/               # Contextos de React para manejar el estado global.
├── hooks/                 # Hooks personalizados para lógica reutilizable.
├── pages/                 # Páginas de la aplicación, cada una representa una vista.
└── routes/                # Definiciones de rutas para la navegación de la aplicación.
```

## Archivo `.env`

Es necesario crear un archivo `.env` en la raíz del proyecto para definir las variables de entorno necesarias para el funcionamiento de la aplicación. Este archivo no se sube al repositorio por razones de seguridad.

### Variables de Entorno
- **VITE_API_LIST_URL**: Url del API para obtener la lista de datos.
- **VITE_API_LIST_DETAILS_URL**: Parte de la url del API para obtener el detalle de un producto (se concatena con el ID del producto).
- **VITE_API_ADD_URL**: Url del API donde se envia la información para agregar un producto al carrito de compras.
- **VITE_CACHE_PREFIX**: Prefijo del cache
- **VITE_CACHE_TTL**: Tiempo de vida del cache en milisegundos

Asegúrate de definir estas variables en tu archivo `.env` antes de ejecutar la aplicación.

## Notas Adicionales

- Este proyecto incluye configuraciones de ESLint para mantener la calidad del código.
- Se han utilizado iconos de la biblioteca `react-icons` para mejorar la interfaz de usuario.
- Este proyecto utiliza **Tailwind CSS** como framework de estilos, lo que permite un manejo eficiente y flexible de los estilos en la aplicación. Además, la aplicación ha sido diseñada para ser **responsive**, asegurando una experiencia de usuario óptima en dispositivos de diferentes tamaños.

