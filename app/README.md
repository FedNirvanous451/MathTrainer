# MathTrainer – Developer Documentation

**MathTrainer** — веб-приложение для тренировки математических навыков.  
Проект состоит из клиентской части (SPA на React + TypeScript) и серверной части (REST API на Go + PostgreSQL). Запуск через Docker Compose.

---

##  Технологический стек

| Компонент       | Технологии |
|----------------|------------|
| **Клиент**      | React 18, TypeScript, Vite, TailwindCSS, KaTeX, Axios, TanStack Query |
| **Сервер**      | Go 1.21+, Gin, JWT, bcrypt, sqlx |
| **База данных** | PostgreSQL 15, golang-migrate |
| **Инфраструктура** | Docker, Docker Compose, GitHub Actions (опционально) |
| **Управление задачами** | Vikunja (Kanban-доска) |

---

##  Клонирование репозиториев

```bash
git clone https://github.com/FedNirvanous451/MathTrainer
