# ABTube - YouTube Clone Frontend

A modern, production-ready Angular 21 video streaming application built to integrate with a FastAPI backend. This project implements a complete YouTube-style interface with authentication, video streaming, uploads, likes, and comments.

## 🎯 Project Overview

**ABTube** is a full-featured video streaming platform frontend that provides:

- ✅ User authentication (login/register)
- ✅ Video streaming with HTML5 player
- ✅ Video upload system with file validation
- ✅ Like/Unlike functionality with real-time status
- ✅ Comment system with real-time updates
- ✅ Responsive YouTube-inspired UI
- ✅ Modern dark theme design
- ✅ Protected routes with auth guards
- ✅ HTTP interceptor for automatic token injection
- ✅ Profile/Channel page with video management
- ✅ Delete video functionality

## 🧱 Tech Stack

- **Framework**: Angular 21 (Standalone Components)
- **Styling**: Tailwind CSS 4.x
- **HTTP Client**: Angular HttpClient with RxJS
- **Forms**: Reactive Forms
- **Routing**: Angular Router with lazy loading support
- **State Management**: Signals (Angular 21)
- **Icons**: Unicode emoji icons (easily replaceable)

## 📁 Project Structure

```
src/app/
├── core/
│   ├── guards/
│   │   └── auth.guard.ts              # Route protection
│   ├── interceptors/
│   │   └── token.interceptor.ts       # JWT token injection
│   └── services/
│       ├── auth.service.ts            # Authentication logic
│       ├── video.service.ts           # Video CRUD operations
│       ├── comment.service.ts         # Comment management
│       └── sidebar.service.ts         # Sidebar state
├── pages/
│   ├── home/                          # Video grid feed
│   ├── login/                         # Login page
│   ├── register/                      # Registration page
│   ├── video-player/                  # Video player & comments
│   ├── upload/                        # Video upload form
│   └── profile/                       # User channel page
├── shared/
│   ├── navbar/                        # Top navigation
│   ├── sidebar/                       # Left sidebar navigation
│   └── video-card/                    # Reusable video thumbnail card
├── app.component.ts                   # Root component
├── app.config.ts                      # App configuration
└── app.routes.ts                      # Route definitions
```

## 🔌 API Integration

**Base URL**: `http://localhost:8000/api`

### Endpoints Used

| Feature | Method | Endpoint | Auth Required |
|---------|--------|----------|---------------|
| Register | POST | `/register` | ❌ |
| Login | POST | `/login` | ❌ |
| Upload Video | POST | `/upload` | ✅ |
| Get All Videos | GET | `/videos` | ❌ |
| Get Single Video | GET | `/video/{id}` | ❌ |
| Stream Video | GET | `/video/{id}` | ❌ |
| Like/Unlike | POST | `/like/{id}` | ✅ |
| Check Like Status | POST | `/liked/{id}` | ✅ |
| Get Comments | GET | `/comment/{id}` | ❌ |
| Add Comment | POST | `/comment/{id}` | ✅ |
| Delete Video | DELETE | `/video/{id}` | ✅ |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 21+
- Running FastAPI backend on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
ng serve

# Build for production
npm run build
```

The application will be available at `http://localhost:4200`

## 🎨 Key Features

### 1. Authentication Flow

- **Login/Register**: Form validation with error handling
- **Token Storage**: JWT stored in localStorage
- **Auto-Logout**: Token removal on logout
- **Route Protection**: Auth guard redirects to login
- **HTTP Interceptor**: Automatically attaches `Bearer` token

### 2. Video Player

- **HTML5 Video Player**: Native browser controls
- **Like System**: Toggle like/unlike with visual feedback
- **Comment Section**: Real-time comment display
- **Add Comments**: Authenticated users can comment
- **Video Metadata**: Title, description, views, date

### 3. Home Feed

- **Video Grid**: Responsive grid layout
- **Video Cards**: Thumbnail, title, uploader, stats
- **Category Chips**: Filter chips (UI ready)
- **Loading States**: Skeleton/loading indicators

### 4. Upload System

- **File Selection**: Video file picker
- **Form Fields**: Title and description
- **Validation**: Required fields and file type
- **Upload Status**: Uploading state indicator
- **Success Redirect**: Navigate to home after upload

### 5. Profile/Channel Page

- **User Videos**: Display all uploaded videos
- **Delete Functionality**: Remove own videos
- **Video Count**: Show total videos
- **Empty State**: Prompt to upload first video

## 🛡️ Security Features

### Auth Guard

```typescript
// Protects routes from unauthenticated access
{ path: 'upload', component: UploadComponent, canActivate: [authGuard] }
```

### Token Interceptor

```typescript
// Automatically adds Authorization header
Authorization: `Bearer ${token}`
```

## 🎨 UI/UX Design

### Color Scheme

```css
--primary: #FF0000;           /* YouTube Red */
--bg-dark: #0f0f0f;           /* Dark background */
--bg-hover: #272727;          /* Hover state */
--text-main: #ffffff;         /* Primary text */
--text-secondary: #aaaaaa;    /* Secondary text */
--border: #303030;            /* Border color */
```

### Responsive Breakpoints

- **Mobile**: `< 768px` - Single column, hidden sidebar
- **Tablet**: `768px - 1000px` - Adjusted layout
- **Desktop**: `> 1000px` - Full layout with sidebar

### Components

- **Navbar**: Fixed top, 56px height
- **Sidebar**: Collapsible, 240px width (72px collapsed)
- **Video Grid**: Auto-fill columns, min 300px
- **Video Cards**: 16:9 aspect ratio thumbnails

## 📝 Component Details

### Video Service (video.service.ts)

```typescript
export interface Video {
    id: string;
    title: string;
    description: string;
    url: string;
    thumbnail_url: string;
    uploader: string;
    views: number;
    likes: string[];
    created_at: string;
}

// Available methods
- getVideos()
- getVideo(id)
- upload(formData)
- like(id)
- checkLike(id)
- deleteVideo(id)
```

### Auth Service (auth.service.ts)

```typescript
// Available methods
- login(credentials)
- register(data)
- logout()
- getToken()
- isAuthenticated()

// Reactive state
currentUser = signal<string | null>(token)
```

### Comment Service (comment.service.ts)

```typescript
export interface Comment {
    id: string;
    username: string;
    text: string;
    timestamp: string;
}

// Available methods
- getComments(videoId)
- addComment(videoId, text)
```

## 🔧 Configuration

### Environment Configuration

Update `videoService.ts`, `authService.ts`, `commentService.ts`:

```typescript
private apiUrl = 'http://localhost:8000/api';
// Change to your backend URL
```

### App Config (app.config.ts)

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([tokenInterceptor]))
  ]
};
```

## 📱 Mobile Responsive

- **Navbar**: Adapts to mobile with adjusted search
- **Sidebar**: Slides in from left on mobile
- **Video Grid**: Single column on small screens
- **Video Player**: Full-width on mobile

## 🎯 Future Enhancements

### Recommended Additions

1. **Search Functionality**: Implement video search
2. **Categories/Tags**: Filter videos by category
3. **Subscriptions**: Follow uploaders
4. **Playlists**: Create and manage playlists
5. **Watch History**: Track viewed videos
6. **Notifications**: Real-time notifications
7. **Video Quality Selection**: Multiple quality options
8. **Thumbnail Generation**: Auto-generate thumbnails
9. **User Profile Edit**: Update profile information
10. **Dark/Light Mode Toggle**: Theme switcher

### Performance Optimizations

- **Lazy Loading Routes**: Split bundles
- **Virtual Scrolling**: For large video lists
- **Image Optimization**: WebP thumbnails
- **Caching Strategy**: Service worker
- **CDN Integration**: For video streaming

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run e2e

# Build and test production bundle
npm run build
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend allows `http://localhost:4200`
2. **401 Unauthorized**: Check token is being sent correctly
3. **Video Not Playing**: Verify video URL and CORS headers
4. **Routing Issues**: Check `provideRouter` in app.config.ts

### Backend Requirements

Ensure your FastAPI backend has:

```python
# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- YouTube for design inspiration
- FastAPI community

---

**Built with ❤️ using Angular 21**

For questions or support, please open an issue on the repository.
