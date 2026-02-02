import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UploadComponent } from './pages/upload/upload.component';
import { VideoPlayerComponent } from './pages/video-player/video-player.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, data: { hideLayout: true } },
    { path: 'register', component: RegisterComponent, data: { hideLayout: true } },
    { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent), data: { hideLayout: true } },
    { path: 'reset-password', loadComponent: () => import('./pages/reset-password/reset-password.component').then(m => m.ResetPasswordComponent), data: { hideLayout: true } },
    { path: 'upload', component: UploadComponent, canActivate: [authGuard] },
    { path: 'video/:id', component: VideoPlayerComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '' }
];
