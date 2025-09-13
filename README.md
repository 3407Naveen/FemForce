# FemForce

**AI-powered fitness & health monitoring web app for women in defense**  
FemForce monitors vitals from wearables, predicts fatigue/stress with AI, and delivers real-time alerts and personalized recommendations to personnel, medical officers, and commanders — ensuring safety and mission readiness.

---

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Architecture & Flow](#architecture--flow)  
4. [Tech Stack](#tech-stack)  
5. [Getting Started (Local Development)](#getting-started-local-development)  
6. [Configuration & Environment Variables](#configuration--environment-variables)  
7. [API Endpoints (Overview)](#api-endpoints-overview)  
8. [AI/ML Module](#aiml-module)  
9. [IoT / Wearable Integration](#iot--wearable-integration)  
10. [Security & Privacy](#security--privacy)  
11. [Testing](#testing)  
12. [Deployment (Docker & Kubernetes)](#deployment-docker--kubernetes)  
13. [Roadmap / Future Work](#roadmap--future-work)  
14. [Contributing](#contributing)  
15. [License & Credits](#license--credits)  
16. [Contact](#contact)

---

## Project Overview
FemForce is a full-stack web application designed to provide women in defense with real-time health monitoring, AI-driven predictive analytics (fatigue/stress), secure role-based dashboards, and automated alerts. It integrates wearable devices and supports offline sync for field conditions.

---

## Key Features
- Role-based access: **Personnel**, **Medical Officers**, **Commanders/Admins**  
- Real-time vitals: heart rate, SpO₂, blood pressure, body temperature, hydration estimate, activity/fatigue index  
- AI/ML insights: fatigue & stress prediction, personalized recovery/recommendations  
- Alerts & escalation: push notifications, email, SMS (configurable)  
- Reporting: auto-generated PDF/Excel summaries and commander readiness dashboards  
- Wearable integration: MQTT + REST ingestion, offline sync (PWA support)  
- Security: JWT auth, AES-256 data encryption at rest, TLS in transit, audit logs  
- Deployment-ready: Dockerized services, Kubernetes-ready manifests

---

## Architecture & Flow
1. **Wearable device / Edge** → streams vitals to MQTT broker or REST ingestion endpoint (device ↔ edge ↔ cloud).  
2. **Ingestion Service** → validates, preprocesses, and writes time-series data to TimescaleDB (Postgres).  
3. **AI/ML Service** → consumes time-series via API or message queue, returns risk scores & recommendations.  
4. **API Backend (FastAPI)** → business logic, RBAC, auth, notifications, report generation.  
5. **Realtime Layer** → WebSockets / Server-Sent Events for live dashboards.  
6. **Frontend (Next.js)** → role-specific dashboards, alerts UI, reports, settings.  
7. **Monitoring & Ops** → logging, metrics, alerting, and audit trails.


---

## Tech Stack
- **Frontend**: React, Next.js, TypeScript, TailwindCSS, ShadCN UI, PWA support  
- **Backend**: Python, FastAPI, WebSockets  
- **Database**: PostgreSQL + TimescaleDB (time-series), Redis (cache, pub/sub)  
- **AI/ML**: PyTorch or TensorFlow (model training + inference), ML served via REST/gRPC  
- **IoT / Messaging**: MQTT broker (e.g., Mosquitto), optional Kafka/RabbitMQ for pipelines  
- **Auth & Security**: JWT, OAuth2 compatible flows, AES-256 at rest, TLS/HTTPS  
- **DevOps**: Docker, Kubernetes manifests, Nginx, Cert-Manager (TLS), Prometheus/Grafana (monitoring)  
- **Utilities**: Celery (background tasks), MinIO or S3-compatible storage (reports/exports)

---

## Getting Started (Local Development)

### Prerequisites
- Node.js (v16+) & npm / yarn  
- Python 3.10+ & pipenv/venv  
- Docker & Docker Compose  
- PostgreSQL (preferably TimescaleDB extension)  
- MQTT broker (Mosquitto)

### Quick start (using Docker Compose)
```bash
git clone https://github.com/<your-org>/femforce.git
cd femforce
cp .env.example .env
docker compose up --build

# Start dev compose
docker compose up --build

# Run backend tests
cd backend && pytest

# Run frontend dev
cd frontend && npm run dev
