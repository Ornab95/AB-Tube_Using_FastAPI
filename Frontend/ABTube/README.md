# 🎨 ABTube Frontend

<div align="center">

![Angular](https://img.shields.io/badge/Angular-21.1-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Plyr](https://img.shields.io/badge/Plyr-3.8-00B9FF?style=for-the-badge&logo=html5&logoColor=white)

**A modern, responsive YouTube-like video platform frontend built with Angular**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Pages](#-pages) • [Components](#-components)

</div>

---

## ✨ Features

### 🎬 **Video Experience**
- **Plyr Video Player**: Enhanced video player with custom controls and theme integration
  - Playback speed controls (0.5x - 2x)
  - Picture-in-picture support
  - Keyboard shortcuts (Space, F, M, Arrow keys)
  - Fullscreen optimization for all video orientations
- **Video Upload**: Upload videos with metadata (title, description, category)
- **Video Grid**: Browse videos in a responsive grid layout
- **Category Filtering**: Filter videos by categories

### 🎨 **Modern UI/UX**
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **Glassmorphic Theme**: Modern glassmorphism design with smooth animations
- **Dark Mode Ready**: Styled with CSS custom properties for easy theming
- **Smooth Animations**: Micro-interactions and transitions throughout
- **Custom Color Palette**: Soft Sky Blue (#6CB2EB) primary color theme

### 👤 **User Features**
- **Authentication**: Secure login and registration system
- **User Profile**: View and manage user profile
- **Likes System**: Like/unlike videos
- **Comments**: Add, view, and delete comments on videos
- **Password Recovery**: Forgot password and reset functionality

### 🎯 **Navigation**
- **Sidebar Navigation**: Collapsible sidebar with route navigation
- **Navbar**: Fixed navbar with search, notifications, and user menu
- **Breadcrumbs**: Context-aware navigation breadcrumbs

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Angular** | Frontend framework | 21.1.0 |
| **TypeScript** | Type-safe JavaScript | 5.9.2 |
| **RxJS** | Reactive programming | 7.8.0 |
| **Plyr** | Enhanced video player | 3.8.4 |
| **TailwindCSS** | Utility-first CSS framework | 4.1.12 |
| **Vitest** | Unit testing framework | 4.0.8 |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm 11+
- Angular CLI 21+

### Steps

1. **Navigate to the Frontend directory**
   ```bash
   cd Frontend/ABTube
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open in browser** 🎉
   ```
   http://localhost:4200
   ```

---

## 📱 Pages

### 🏠 Home
- Grid view of all uploaded videos
- Category sidebar navigation
- Responsive video cards with thumbnails

### 🎥 Video Player
- Enhanced Plyr video player with custom controls
- Video metadata (title, description, uploader, date)
- Like button with count
- Comments section with real-time updates
- Related videos sidebar (planned)

### 📤 Upload
- Video file upload with drag-and-drop
- Video metadata form (title, description, category)
- Upload progress indicator
- Category selection dropdown

### 🔐 Authentication
- **Login**: Email/username and password login
- **Register**: New user registration with email validation
- **Forgot Password**: Request password reset link
- **Reset Password**: Set new password with reset token

### 👤 Profile
- View user information
- List of uploaded videos
- User statistics (planned)

---

## 🧩 Components

### 🎯 Core Components

```
src/app/
├── pages/               # Page components
│   ├── home/           # Homepage with video grid
│   ├── video-player/   # Video player page
│   ├── upload/         # Video upload page
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── profile/        # User profile page
│   ├── forgot-password/# Password recovery
│   └── reset-password/ # Password reset
├── shared/             # Shared components
│   ├── navbar/         # Top navigation bar
│   └── sidebar/        # Sidebar navigation
└── core/               # Core services
    └── services/       # API services
        ├── auth.service.ts
        ├── video.service.ts
        └── comment.service.ts
```

---

## 🎨 Styling

### Custom CSS Variables
```css
:root {
  --primary: #6CB2EB;          /* Soft Sky Blue */
  --bg-main: #F5F7FA;          /* Light background */
  --bg-card: #FFFFFF;          /* Card background */
  --text-main: #2D3748;        /* Primary text */
  --glass-bg: rgba(255, 255, 255, 0.7); /* Glassmorphism */
}
```

### Design System
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Smooth Transitions**: All interactive elements have transitions
- **Consistent Spacing**: Using a systematic spacing scale
- **Typography**: Poppins font family throughout

### Responsive Breakpoints
```css
/* Mobile */    max-width: 640px
/* Tablet */    max-width: 1000px
/* Desktop */   max-width: 1400px+
```

---

## 🚀 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Watch mode for building
npm run watch

# Lint code
ng lint
```

### Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

### Code Scaffolding
```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new module
ng generate module module-name
```

### Build
```bash
ng build
```
The build artifacts will be stored in the `dist/` directory.

---

## 🎥 Video Player Features

### Plyr Integration
- **Custom Controls**: Themed to match ABTube's color scheme
- **Speed Controls**: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x
- **Keyboard Shortcuts**:
  - `Space` - Play/Pause
  - `F` - Fullscreen
  - `M` - Mute/Unmute
  - `↑/↓` - Volume
  - `←/→` - Seek
  - `0-9` - Jump to percentage

### Video Optimization
- **Horizontal & Vertical**: Optimized for all aspect ratios
- **Fullscreen Fix**: Videos display completely without cropping
- **Control Bar**: Full-width controls for vertical videos
- **Object-Fit Contain**: Ensures entire video is always visible

---

## 📂 Project Structure

```
Frontend/ABTube/
├── src/
│   ├── app/
│   │   ├── pages/          # Page components
│   │   ├── shared/         # Shared components
│   │   ├── core/           # Core services & guards
│   │   └── app.component.ts
│   ├── styles.css          # Global styles
│   └── index.html
├── angular.json            # Angular configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies
```

---

## 🔒 Authentication Flow

1. **Registration**: User creates account → Server validates → JWT token issued
2. **Login**: User logs in → Server validates → JWT token stored in localStorage
3. **Protected Routes**: Guards check for valid JWT before allowing access
4. **Password Reset**: 
   - User requests reset → Server sends token
   - User clicks link → Enters new password → Server validates token

---

## 🎯 Services

### AuthService
```typescript
- register(username, email, password)
- login(username, password)
- logout()
- isAuthenticated()
- getCurrentUser()
- forgotPassword(email)
- resetPassword(token, newPassword)
```

### VideoService
```typescript
- uploadVideo(formData)
- getVideo(id)
- getAllVideos()
- getVideosByCategory(category)
- deleteVideo(id)
- like(videoId)
- checkLike(videoId)
```

### CommentService
```typescript
- getComments(videoId)
- addComment(videoId, text)
- deleteComment(commentId)
```

---

## 🎨 UI Components

### Video Card
- Thumbnail placeholder
- Video title
- Uploader name
- Upload date
- Duration badge
- Category badge

### Navbar
- ABTube logo
- Search bar
- User menu (when authenticated)
- Login/Register buttons (when not authenticated)

### Sidebar
- Navigation links
- Category filters
- Collapsible on mobile

---

## 🚦 Routing

| Route | Component | Auth Required |
|-------|-----------|---------------|
| `/` | Home | ❌ |
| `/video/:id` | VideoPlayer | ❌ |
| `/upload` | Upload | ✅ |
| `/login` | Login | ❌ |
| `/register` | Register | ❌ |
| `/profile` | Profile | ✅ |
| `/forgot-password` | ForgotPassword | ❌ |
| `/reset-password` | ResetPassword | ❌ |

---

## 🎨 Glassmorphism Effect

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}
```

---

## 📊 Performance

- **Lazy Loading**: Routes are lazy-loaded for better performance
- **Standalone Components**: Modern Angular architecture
- **RxJS Optimization**: Proper subscription management
- **Change Detection**: OnPush strategy where applicable

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
ng test --coverage
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is part of the ABTube full-stack application.

---

<div align="center">

**Built with ❤️ using Angular & TypeScript**

### 🎬 Experience the best video platform UI

[⬆ Back to Top](#-abtube-frontend)

</div>
