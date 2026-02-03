# 🚀 ABTube Backend API

<div align="center">

![Python](https://img.shields.io/badge/Python-3.9+-blue?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-00D6A1?style=for-the-badge&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0+-red?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

**A high-performance, feature-rich video streaming backend built with FastAPI**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [API Endpoints](#-api-endpoints) • [Database Schema](#-database-schema)

</div>

---

## ✨ Features

### 🎥 **Video Management**
- **Upload & Stream**: Upload videos with metadata (title, description, category)
- **Video Streaming**: Efficient video streaming with range request support
- **Categorization**: Organize videos by categories
- **Metadata**: Duration tracking and automatic timestamp generation

### 👤 **User Authentication**
- **JWT-based Auth**: Secure authentication with JSON Web Tokens
- **User Registration**: Create new accounts with email validation
- **Login System**: Secure password hashing with bcrypt
- **Password Reset**: Token-based password recovery system

### 💬 **Social Interactions**
- **Likes System**: Like/unlike videos
- **Comments**: Add, view, and delete comments on videos
- **User Tracking**: Track user interactions and engagement

### 🗄️ **Database**
- **SQLAlchemy ORM**: Type-safe database operations
- **Automatic Migrations**: Database schema migrations on startup
- **Relationships**: Properly structured foreign key relationships

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance async web framework |
| **SQLAlchemy** | SQL ORM for database operations |
| **SQLite** | Lightweight SQL database |
| **Uvicorn** | ASGI server for serving the API |
| **JWT** | Secure token-based authentication |
| **Bcrypt** | Password hashing and verification |

---

## 📦 Installation

### Prerequisites
- Python 3.9 or higher
- pip (Python package manager)

### Steps

1. **Navigate to the Backend directory**
   ```bash
   cd Backend
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   
   # Windows
   venv\\Scripts\\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install fastapi uvicorn sqlalchemy python-multipart bcrypt pyjwt python-jose passlib
   ```

4. **Run the server**
   ```bash
   uvicorn main:app --reload
   ```

5. **Server will start at** 🎉
   - API: `http://localhost:8000`
   - Interactive API docs: `http://localhost:8000/docs`
   - Alternative docs: `http://localhost:8000/redoc`

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login and receive JWT token | ❌ |
| `POST` | `/forgot-password` | Request password reset token | ❌ |
| `POST` | `/reset-password` | Reset password with token | ❌ |

### 🎬 Video Management (`/api/video`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/upload` | Upload a new video | ✅ |
| `GET` | `/{video_id}` | Get video metadata | ❌ |
| `GET` | `/stream/{video_id}` | Stream video file | ❌ |
| `GET` | `/all` | Get all videos | ❌ |
| `GET` | `/category/{category}` | Get videos by category | ❌ |
| `DELETE` | `/{video_id}` | Delete a video | ✅ |

### 💖 Interactions (`/api/`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/like/{video_id}` | Like/unlike a video | ✅ |
| `GET` | `/like/{video_id}/check` | Check if user liked video | ✅ |
| `POST` | `/comment/{video_id}` | Add a comment | ✅ |
| `GET` | `/comments/{video_id}` | Get all comments for video | ❌ |
| `DELETE` | `/comment/{comment_id}` | Delete a comment | ✅ |

---

## 🗃️ Database Schema

### Tables

```
┌─────────────┐
│    User     │
├─────────────┤
│ id          │◄─┐
│ username    │  │
│ email       │  │
│ password    │  │
│ reset_token │  │
└─────────────┘  │
                 │
┌──────────────┐ │      ┌───────────┐
│    Video     │ │      │   Like    │
├──────────────┤ │      ├───────────┤
│ id           │◄┼──────┤ video_id  │
│ title        │ │      │ user_id   │◄─┐
│ description  │ │      │created_at │  │
│ category     │ │      └───────────┘  │
│ duration     │ │                     │
│ file_path    │ │      ┌───────────┐  │
│ user_id      │─┘  ┌───┤  Comment  │  │
│ created_at   │    │   ├───────────┤  │
└──────────────┘    │   │ id        │  │
                    └───┤ video_id  │  │
                        │ user_id   │──┘
                        │ comment   │
                        │created_at │
                        └───────────┘
```

### Models

- **User**: Authentication and user profile data
- **Video**: Video metadata and file references
- **Like**: User likes on videos
- **Comment**: User comments on videos

---

## 🔧 Configuration

### CORS Settings
By default, CORS is configured to allow all origins for development:
```python
allow_origins=["*"]  # Change in production!
```

### Database
- Uses SQLite by default (`database.db`)
- Automatic table creation on startup
- Migration system for schema updates

---

## 📂 Project Structure

```
Backend/
├── main.py              # FastAPI application entry point
├── database.py          # Database configuration & migrations
├── models.py            # SQLAlchemy models
├── utils.py             # Utility functions
├── routes/              # API route handlers
│   ├── auth.py          # Authentication endpoints
│   ├── video.py         # Video management endpoints
│   └── interaction.py   # Like & comment endpoints
└── uploads/             # Uploaded video files
```

---

## 🚀 Development

### Running in Development Mode
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Interactive API Documentation
FastAPI automatically generates interactive API documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Testing Endpoints
Use the built-in Swagger UI or tools like:
- **cURL**
- **Postman**
- **HTTPie**
- **Thunder Client** (VS Code extension)

---

## 📊 Performance Features

- ⚡ **Async/Await**: Non-blocking I/O for high concurrency
- 🎯 **Range Requests**: Efficient video streaming with seeking support
- 💾 **Database Connection Pooling**: Optimized database connections
- 🔄 **CORS Middleware**: Fast cross-origin request handling

---

## 🔒 Security

- 🔐 Password hashing with bcrypt
- 🎫 JWT token-based authentication
- 🛡️ SQL injection protection via SQLAlchemy ORM
- 🔑 Secure password reset flow with tokens

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

---

## 📄 License

This project is part of the ABTube full-stack application.

---

<div align="center">

**Built with ❤️ using FastAPI**

[⬆ Back to Top](#-abtube-backend-api)

</div>
