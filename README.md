# rodrisaiz.com

Portfolio profesional de Rodri Saiz, construido con [Astro](https://astro.build).

## 🚀 Estructura del proyecto

```text
/
├── public/                 # Assets estáticos (favicon, logos, etc.)
├── src/
│   ├── assets/              # Imágenes y datos usados por los componentes
│   ├── components/          # Componentes Astro (Layout, Hero, Skills, Carousel, Work...)
│   ├── pages/                # Rutas del sitio (index.astro, ...)
│   └── styles/               # CSS global
├── docker/
│   └── nginx.conf            # Configuración de nginx para producción
├── Dockerfile                 # Build multi-stage (dev / build / prod)
├── docker-compose.yml          # Entorno de desarrollo
└── docker-compose.prod.yml      # Entorno de producción
```

Astro busca ficheros `.astro` o `.md` en `src/pages/`, cada uno se expone como una ruta según su nombre de fichero.

## 🧞 Comandos con npm

Requiere Node.js `>=22.12.0`.

| Comando                   | Acción                                            |
| :------------------------ | :------------------------------------------------- |
| `npm install`              | Instala las dependencias                            |
| `npm run dev`               | Levanta el servidor de desarrollo en `localhost:4321` |
| `npm run build`              | Compila el sitio a `./dist/`                          |
| `npm run preview`             | Sirve el build en local antes de desplegar              |
| `npm run astro ...`            | Ejecuta comandos de la CLI de Astro (`astro add`, `astro check`) |

## 🐳 Docker

El proyecto está dockerizado con dos entornos independientes, pensados también para poder añadir en el futuro
nuevos servicios (por ejemplo un panel de administración) sin tener que rehacer la configuración:

- **dev**: servidor de desarrollo de Astro con hot reload, montando el código como volumen.
- **prod**: build estático servido por nginx, sin dependencias de Node en tiempo de ejecución.

### Desarrollo (local)

```bash
# Construir e iniciar el entorno de desarrollo (http://localhost:4321)
docker compose up --build

# Iniciar en segundo plano
docker compose up -d

# Parar los contenedores (mantiene la imagen y los volúmenes)
docker compose stop

# Parar y eliminar contenedores y red (mantiene la imagen)
docker compose down

# Destruir todo: contenedores, red, volúmenes e imágenes del proyecto
docker compose down --rmi all --volumes --remove-orphans
```

### Producción

```bash
# Construir e iniciar el entorno de producción (http://localhost:80)
docker compose -f docker-compose.prod.yml up --build -d

# Ver logs
docker compose -f docker-compose.prod.yml logs -f

# Parar los contenedores
docker compose -f docker-compose.prod.yml stop

# Parar y eliminar contenedores y red
docker compose -f docker-compose.prod.yml down

# Destruir todo: contenedores, red e imágenes del proyecto
docker compose -f docker-compose.prod.yml down --rmi all --remove-orphans
```

### Solo Docker (sin compose)

```bash
# Build de la imagen de desarrollo
docker build --target dev -t rodrisaiz-com:dev .

# Build de la imagen de producción
docker build --target prod -t rodrisaiz-com:prod .
```

## 👀 Saber más

Consulta la [documentación de Astro](https://docs.astro.build) o únete a su [servidor de Discord](https://astro.build/chat).
