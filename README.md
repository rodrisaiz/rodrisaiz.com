# rodrisaiz.com

Rodri Saiz's professional portfolio, built with [Astro](https://astro.build).

## 🚀 Project structure

```text
/
├── public/                 # Static assets (favicon, logos, etc.)
├── src/
│   ├── assets/              # Images and data used by the components
│   ├── components/          # Astro components (Layout, Hero, Skills, Carousel, Work...)
│   ├── pages/                # Site routes (index.astro, ...)
│   └── styles/               # Global CSS
├── docker/
│   └── nginx.conf            # nginx configuration for production
├── Dockerfile                 # Multi-stage build (dev / build / prod)
├── docker-compose.yml          # Development environment
└── docker-compose.prod.yml      # Production environment
```

Astro looks for `.astro` or `.md` files in `src/pages/`; each one is exposed as a route based on its file name.

## 🧞 npm commands

Requires Node.js `>=22.12.0`.

| Command                   | Action                                            |
| :------------------------ | :------------------------------------------------- |
| `npm install`              | Installs dependencies                                |
| `npm run dev`               | Starts the dev server at `localhost:4321`             |
| `npm run build`              | Builds the site to `./dist/`                           |
| `npm run preview`             | Serves the build locally before deploying               |
| `npm run astro ...`            | Runs Astro CLI commands (`astro add`, `astro check`)    |

## 🐳 Docker

The project is dockerized with two independent environments, also designed so future
services (e.g. a small admin panel) can be added without reworking the setup:

- **dev**: Astro dev server with hot reload, mounting the source code as a volume.
- **prod**: static build served by nginx, with no Node runtime dependency.

### Development (local)

```bash
# Build and start the development environment (http://localhost:4321)
docker compose up --build

# Start in the background
docker compose up -d

# Stop the containers (keeps the image and volumes)
docker compose stop

# Stop and remove containers and network (keeps the image)
docker compose down

# Tear down everything: containers, network, volumes, and images for this project
docker compose down --rmi all --volumes --remove-orphans
```

### Production

```bash
# Build and start the production environment (http://localhost:80)
docker compose -f docker-compose.prod.yml up --build -d

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Stop the containers
docker compose -f docker-compose.prod.yml stop

# Stop and remove containers and network
docker compose -f docker-compose.prod.yml down

# Tear down everything: containers, network, and images for this project
docker compose -f docker-compose.prod.yml down --rmi all --remove-orphans
```

### Docker only (no compose)

```bash
# Build the development image
docker build --target dev -t rodrisaiz-com:dev .

# Build the production image
docker build --target prod -t rodrisaiz-com:prod .
```

## 👀 Learn more

Check out the [Astro documentation](https://docs.astro.build) or join their [Discord server](https://astro.build/chat).
