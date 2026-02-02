# ABTube API Reference

Quick reference for all services, components, and their public APIs.

## 🔧 Core Services

### AuthService

**Location**: `src/app/core/services/auth.service.ts`

```typescript
class AuthService {
  // Properties
  currentUser: Signal<string | null>  // Reactive user state
  
  // Methods
  login(credentials: FormData): Observable<{access_token: string}>
  register(data: FormData): Observable<any>
  logout(): void
  getToken(): string | null
  isAuthenticated(): boolean
}
```

**Usage Example**:
```typescript
// Inject service
auth = inject(AuthService);

// Login
this.auth.login(formData).subscribe(/* ... */);

// Check auth status
if (this.auth.isAuthenticated()) {
  // User is logged in
}

// Get current user (reactive)
@if (auth.currentUser()) {
  <div>Logged in</div>
}
```

---

### VideoService

**Location**: `src/app/core/services/video.service.ts`

```typescript
interface Video {
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

class VideoService {
  getVideos(): Observable<Video[]>
  getVideo(id: string): Observable<Video>
  upload(formData: FormData): Observable<any>
  like(id: string): Observable<any>
  checkLike(id: string): Observable<{liked: boolean}>
  deleteVideo(id: string): Observable<any>
}
```

**Usage Example**:
```typescript
videoService = inject(VideoService);

// Get all videos
this.videoService.getVideos().subscribe(videos => {
  this.videos = videos;
});

// Like a video
this.videoService.like(videoId).subscribe(() => {
  console.log('Liked!');
});

// Check if liked
this.videoService.checkLike(videoId).subscribe(res => {
  this.isLiked = res.liked;
});

// Delete video
this.videoService.deleteVideo(videoId).subscribe(() => {
  console.log('Deleted!');
});
```

---

### CommentService

**Location**: `src/app/core/services/comment.service.ts`

```typescript
interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

class CommentService {
  getComments(videoId: string): Observable<Comment[]>
  addComment(videoId: string, text: string): Observable<any>
}
```

**Usage Example**:
```typescript
commentService = inject(CommentService);

// Get comments
this.commentService.getComments(videoId).subscribe(comments => {
  this.comments = comments;
});

// Add comment
this.commentService.addComment(videoId, 'Great video!').subscribe(() => {
  // Reload comments
});
```

---

### SidebarService

**Location**: `src/app/core/services/sidebar.service.ts`

```typescript
class SidebarService {
  isOpen: Signal<boolean>  // Reactive sidebar state
  toggle(): void
}
```

**Usage Example**:
```typescript
sidebarService = inject(SidebarService);

// Toggle sidebar
toggleSidebar() {
  this.sidebarService.toggle();
}

// Get sidebar state
get isOpen(): boolean {
  return this.sidebarService.isOpen();
}
```

---

## 🛡️ Guards

### authGuard

**Location**: `src/app/core/guards/auth.guard.ts`

```typescript
export const authGuard: CanActivateFn = (route, state) => {
  // Returns true if authenticated, redirects to /login if not
}
```

**Usage**:
```typescript
// In routes
{ 
  path: 'upload', 
  component: UploadComponent, 
  canActivate: [authGuard] 
}
```

---

## 🔌 Interceptors

### tokenInterceptor

**Location**: `src/app/core/interceptors/token.interceptor.ts`

```typescript
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Automatically adds Authorization header with JWT token
  // Applied to all HTTP requests
}
```

**Registered in**: `src/app/app.config.ts`

---

## 📄 Components

### VideoCardComponent

**Location**: `src/app/shared/video-card/video-card.component.ts`

```typescript
@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe]
})
export class VideoCardComponent {
  @Input() video!: Video;
}
```

**Usage**:
```html
<app-video-card [video]="videoObject"></app-video-card>
```

**Features**:
- Displays video thumbnail
- Shows title, uploader, views, date
- Click to navigate to video player
- Hover effects

---

### NavbarComponent

**Location**: `src/app/shared/navbar/navbar.component.ts`

```typescript
@Component({
  selector: 'app-navbar',
  standalone: true
})
export class NavbarComponent {
  auth = inject(AuthService);
  logout(): void
  toggleSidebar(): void
}
```

**Usage**:
```html
<app-navbar></app-navbar>
```

**Features**:
- Logo and branding
- Search box (UI ready)
- Upload button (authenticated users)
- User avatar with logout
- Sign in button (guests)

---

### SidebarComponent

**Location**: `src/app/shared/sidebar/sidebar.component.ts`

```typescript
@Component({
  selector: 'app-sidebar',
  standalone: true
})
export class SidebarComponent {
  auth = inject(AuthService);
  sidebarService = inject(SidebarService);
  
  get isOpen(): boolean
}
```

**Usage**:
```html
<app-sidebar></app-sidebar>
```

**Features**:
- Navigation links
- Active route highlighting
- Collapsible state
- Conditional links based on auth

---

## 📱 Page Components

### HomeComponent

**Path**: `/`

```typescript
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  loading = true;
  
  ngOnInit(): void  // Loads videos
}
```

### LoginComponent

**Path**: `/login`

```typescript
export class LoginComponent {
  loginForm: FormGroup;
  error = '';
  
  onSubmit(): void  // Handles login
}
```

### RegisterComponent

**Path**: `/register`

```typescript
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';
  
  onSubmit(): void  // Handles registration
}
```

### VideoPlayerComponent

**Path**: `/video/:id`

```typescript
export class VideoPlayerComponent implements OnInit {
  @Input() id!: string;
  video: Video | null = null;
  comments: Comment[] = [];
  newComment = '';
  isLiked = false;
  
  ngOnInit(): void
  loadVideo(id: string): void
  loadComments(id: string): void
  loadLikeStatus(id: string): void
  likeVideo(): void
  postComment(): void
}
```

### UploadComponent

**Path**: `/upload` (Protected)

```typescript
export class UploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  isUploading = false;
  
  onFileSelected(event: any): void
  onSubmit(): void
}
```

### ProfileComponent

**Path**: `/profile` (Protected)

```typescript
export class ProfileComponent implements OnInit {
  userVideos: Video[] = [];
  loading = true;
  
  ngOnInit(): void
  loadUserVideos(): void
  deleteVideo(videoId: string): void
}
```

---

## 🎨 Styling Variables

**Location**: `src/styles.css`

```css
:root {
  --primary: #FF0000;
  --bg-dark: #0f0f0f;
  --bg-primary: #0f0f0f;
  --bg-card: #0f0f0f;
  --bg-hover: #272727;
  --text-main: #ffffff;
  --text-secondary: #aaaaaa;
  --border: #303030;
  --border-color: #272727;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  --radius: 12px;
  --font-main: 'Roboto', 'Arial', sans-serif;
}
```

**Utility Classes**:
- `.container` - Max width container
- `.btn` - Base button
- `.btn-primary` - Primary button
- `.btn-ghost` - Ghost button

---

## 🛣️ Routes

**Location**: `src/app/app.routes.ts`

```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadComponent, canActivate: [authGuard] },
  { path: 'video/:id', component: VideoPlayerComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
```

---

## 📚 Common Patterns

### Inject Services

```typescript
// In component
auth = inject(AuthService);
videoService = inject(VideoService);
router = inject(Router);
```

### Navigate Programmatically

```typescript
router = inject(Router);
this.router.navigate(['/video', videoId]);
```

### Handle Form Submission

```typescript
onSubmit() {
  if (this.form.valid) {
    this.service.submit(this.form.value).subscribe({
      next: (res) => {/* success */},
      error: (err) => {/* error */}
    });
  }
}
```

### Conditional Rendering

```html
@if (condition) {
  <div>Content</div>
} @else {
  <div>Alternative</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

### Reactive State

```typescript
// Using signals
currentUser = signal<User | null>(null);

// Update
this.currentUser.set(user);

// Access in template
@if (currentUser()) {
  <div>{{ currentUser().name }}</div>
}
```

---

## 🔄 Data Flow

### Authentication Flow

```
1. User fills login form
2. LoginComponent calls auth.login()
3. AuthService sends POST /api/login
4. Token received and stored in localStorage
5. currentUser signal updated
6. Router navigates to home
7. All future requests include token (via interceptor)
```

### Video Upload Flow

```
1. User selects file and fills form
2. UploadComponent creates FormData
3. VideoService.upload() sends POST /api/upload with token
4. Backend processes and returns response
5. Navigate to home page
6. New video appears in feed
```

### Video Like Flow

```
1. User clicks like button
2. VideoPlayerComponent calls videoService.like()
3. POST /api/like/:id with token
4. isLiked state toggled
5. Video reloaded to get new like count
6. UI updates with new count and liked state
```

---

## 🧪 Testing Utilities

### Mock Services

```typescript
// In tests
const mockAuthService = {
  isAuthenticated: () => true,
  currentUser: signal('test_user'),
  login: jasmine.createSpy('login')
};
```

### Component Testing

```typescript
TestBed.configureTestingModule({
  imports: [YourComponent],
  providers: [
    { provide: AuthService, useValue: mockAuthService }
  ]
});
```

---

**Quick Start**: Import what you need and follow the patterns above. All components and services are fully typed with TypeScript for IntelliSense support.
