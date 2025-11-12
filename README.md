# 🧩 TODO Backend — Microservices with Docker & npm Workspaces

This repository contains a microservices-based **Todo Backend** built using **Node.js**, **Express**, and **MongoDB**, containerized with **Docker** and **GraphQl**


---

## ⚙️ Features

- 🧱 **Microservices Architecture**
- 🐳 **Dockerized Services**
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

### 3. Run Using Docker Compose

Build and start all services together:

```bash
npm run start
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
| `npm run install` | Installs dependencies for all services |
| `npm run start` | Starts all services using Docker Compose |

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| API Gateway | Express.js |
| Microservices | Node.js, Express.js |
| Database | MongoDB |
| Docker, Docker Compose |
| Authentication | JWT  |
| Graphql |

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


