# 🧩 TODO Backend — Microservices with Docker & npm Workspaces

This repository contains a microservices-based **Todo Backend** built using **Node.js**, **Express**, and **MongoDB**, containerized with **Docker** and managed as a **monorepo** using npm Workspaces.

---

## 📁 Folder Structure

```
TODO-BACKEND/
│
├── services/
│   ├── gateway/          # API Gateway (entry point for all services)
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── .env
│   │
│   ├── todo-service/     # Handles todo CRUD operations
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── .env
│   │
│   └── user-service/     # Handles user management and authentication
│       ├── src/
│       ├── Dockerfile
│       ├── package.json
│       └── .env
│
├── docker-compose.yml     # Docker Compose file to orchestrate all services
└── package.json           # Root package.json (workspace + scripts)
```

---

## ⚙️ Features

- 🧱 **Microservices Architecture**
- 🐳 **Dockerized Services**
- 🔗 **npm Workspaces for dependency management**
- 🧩 **Modular and Scalable project structure**
- 🧠 **Supports MongoDB for data persistence**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/todo-backend.git
cd todo-backend
```

---

### 2. Install Dependencies for All Services

This project uses **npm workspaces** to install dependencies across all services at once.

```bash
npm install
```

> This will automatically install all dependencies in:
> - `services/gateway`
> - `services/todo-service`
> - `services/user-service`

---

### 3. Environment Setup

Each service has its own `.env` file for environment variables.

Example (`services/todo-service/.env`):

```
PORT=4001
MONGO_URI=mongodb://mongo:27017/todos
```

> Make sure you update `.env` files according to your local or Docker setup.

---

### 4. Run Using Docker Compose

Build and start all services together:

```bash
npm run start:all
```

Or directly:

```bash
docker-compose up --build
```

Once running:
- **Gateway** → `http://localhost:4000`
- **Todo Service** → internal at `http://todo-service:4001`
- **User Service** → internal at `http://user-service:4002`
- **MongoDB** → `mongodb://mongo:27017`

---

## 🧰 Root-Level Scripts

You can run commands from the root using npm workspace scripts:

| Command | Description |
|----------|-------------|
| `npm run install:all` | Installs dependencies for all services |
| `npm run dev:gateway` | Runs the gateway service in dev mode |
| `npm run dev:todo` | Runs the todo service in dev mode |
| `npm run dev:user` | Runs the user service in dev mode |
| `npm run start:all` | Starts all services using Docker Compose |

Example:

```bash
npm run dev:gateway
```

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| API Gateway | Express.js |
| Microservices | Node.js, Express.js |
| Database | MongoDB |
| Containerization | Docker, Docker Compose |
| Package Management | npm Workspaces |
| Authentication | JWT / Passport (optional, depending on setup) |

---

## 🧱 Project Workflow

1. The **Gateway** receives incoming requests and routes them to the appropriate microservice.
2. **Todo Service** manages todos (CRUD operations).
3. **User Service** manages user data and authentication.
4. All services communicate via internal Docker network.
5. MongoDB stores service-specific data collections.

---

## 🧩 Example Commands

**Install all dependencies**
```bash
npm install
```

**Run gateway service only**
```bash
npm run dev:gateway
```

**Start everything via Docker**
```bash
docker-compose up --build
```

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create a new branch (`feature/your-feature-name`)
3. Commit your changes
4. Push and create a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

**Author:** Ashmita Gorkhali  
**Stack:** Node.js • Express • MongoDB • Docker • npm Workspaces
