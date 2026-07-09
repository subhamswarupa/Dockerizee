# 🤖 AI Task Manager (Dockerized)

A full-stack AI Task Manager built with React, Express.js, and MongoDB, fully containerized using Docker. The project demonstrates how a modern web application can be packaged into lightweight containers for consistent deployment across different environments.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Docker Compose                        │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │   Frontend   │    │   Backend    │    │   MongoDB     │   │
│  │   React +    │───▶│   Express    │───▶│   Database    │   │
│  │   Vite       │    │   Node.js    │    │   Port 27017  │   │
│  │   Port 5173  │    │   Port 5000  │    │              │   │
│  └──────────────┘    └──────────────┘    └──────────────┘   │
│         │                    │                    │          │
│         └────────────────────┴────────────────────┘          │
│                      Network: taskmanager                    │
└─────────────────────────────────────────────────────────────┘
```


## Features

- User Authentication (JWT-based)
- Dashboard with statistics
- Create, Edit, Delete tasks
- Mark tasks complete/incomplete
- Search tasks
- Filter by priority, category, status
- Sort by date, priority, title
- Dark mode support
- Responsive design
- Health check endpoints
- Production-optimized Docker images

---

## 🚀 Features

- AI-powered task management
- Create, edit, and delete tasks
- Responsive and modern UI
- REST API backend
- MongoDB database integration
- Fully Dockerized application
- Environment variable support
- Easy deployment using Docker Compose

## Tech Stack

| Layer        | Technology                |
|-------------|---------------------------|
| Frontend    | React 18, Vite 5, Tailwind CSS 3 |
| Backend     | Node.js 22, Express 4     |
| Database    | MongoDB 7                 |
| Auth        | JSON Web Tokens (JWT)     |
| Container   | Docker, Docker Compose    |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (v24+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.20+)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Environment Variables

The project includes pre-configured `.env` files. Review and modify if needed:

```bash
# Root .env
cat .env

# Backend .env
cat backend/.env

# Frontend .env
cat frontend/.env
```

### 3. Build and Run with Docker Compose

```bash
docker compose up --build
```

This will build and start all three services:
- Frontend at http://localhost:5173
- Backend at http://localhost:5000
- MongoDB on port 27017

### 4. Access the Application

Open http://localhost:5173 in your browser.

**Demo Credentials:**
- Email: `test@test.com`
- Password: `password123`

*(Register a new account if you prefer)*

## Docker Commands

### Build and Start

```bash
docker compose up --build
```

### Start in Background

```bash
docker compose up --build -d
```

### View Logs

```bash
docker compose logs -f
```

### Stop Containers

```bash
docker compose down
```

### Stop and Remove Volumes

```bash
docker compose down -v
```

### Rebuild a Single Service

```bash
docker compose up --build -d backend
```

### Check Container Status

```bash
docker compose ps
```

### Check Health

```bash
curl http://localhost:5000/api/health
```

## Environment Variables

| Variable       | Description              | Default                                     |
|---------------|--------------------------|---------------------------------------------|
| `PORT`        | Backend server port      | `5000`                                      |
| `MONGO_URI`   | MongoDB connection string| `mongodb://mongodb:27017/taskmanager`        |
| `JWT_SECRET`  | JWT signing secret       | *(set in .env)*                             |
| `NODE_ENV`    | Node environment         | `production`                                |
| `CORS_ORIGIN` | Allowed CORS origin      | `http://localhost:5173`                     |
| `VITE_API_URL`| API base URL (frontend)  | `http://localhost:5000/api`                 |

## API Endpoints

### Authentication

| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| POST   | `/api/auth/register` | Register a user  |
| POST   | `/api/auth/login`    | Login            |
| GET    | `/api/auth/me`       | Get current user |

### Tasks

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| GET    | `/api/tasks`        | List tasks (with filters) |
| GET    | `/api/tasks/stats`  | Get task statistics |
| POST   | `/api/tasks`        | Create a task       |
| PUT    | `/api/tasks/:id`    | Update a task       |
| DELETE | `/api/tasks/:id`    | Delete a task       |

### Health

| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| GET    | `/api/health`   | Health check      |

## Docker Image Optimization

- **Multi-stage builds**: Separate build and runtime stages
- **Alpine base**: Minimal `node:22-alpine` images
- **Dependency caching**: `package.json` copied before `npm ci`
- **Non-root user**: Containers run as `appuser`
- **Health checks**: Docker-level health monitoring
- **Production mode**: NODE_ENV=production

## Screenshots

| Landing Page | Dashboard |
|-------------|-----------|
| *[Screenshot]* | *[Screenshot]* |

| Dark Mode | Task Management |
|-----------|----------------|
| *[Screenshot]* | *[Screenshot]* |

## Common Issues

### Port Already in Use

```bash
# Check what's using port 5173 or 5000
netstat -ano | findstr :5173
netstat -ano | findstr :5000

# Stop the conflicting process or change ports in docker-compose.yml
```

### MongoDB Connection Refused

Ensure MongoDB container is healthy before backend starts:

```bash
docker compose logs mongodb
```

### Permission Issues

If you see permission errors on Linux:

```bash
# Ensure the docker socket is accessible
sudo chmod 666 /var/run/docker.sock
```

## Future Improvements

- [ ] AI-powered task suggestions
- [ ] Real-time collaboration (WebSockets)
- [ ] File attachments on tasks
- [ ] Email notifications
- [ ] Pagination for large task lists
- [ ] Unit & integration tests
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Kubernetes deployment manifests
- [ ] Rate limiting
- [ ] Request validation (Joi/Zod)

