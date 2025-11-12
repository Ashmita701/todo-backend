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
git clone https://github.com/Ashmita701/todo-backend.git
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
docker-compose up --build -d
```

Once running:
- **Gateway** → `http://localhost:4000`
- **Todo Service** → internal at `http://todo-service:4001`
- **User Service** → internal at `http://user-service:4002`

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
| API Gateway | Express.js, Graphql |
| Microservices | Node.js, Express.js |
| Database | MongoDB |
| Containerized | Docker, Docker Compose |
| Authentication | JWT  |


---


## 🧩 Example Commands

**Install all dependencies**
```bash
npm install
```

**Start everything via Docker**
```bash
docker-compose up --build -d
```

---


