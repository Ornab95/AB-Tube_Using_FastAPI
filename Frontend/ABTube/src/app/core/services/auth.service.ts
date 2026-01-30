import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8000/api';
    private tokenKey = 'access_token';

    // Use a signal for reactive auth state
    currentUser = signal<string | null>(this.getToken());

    constructor(private http: HttpClient, private router: Router) { }

    login(credentials: any) {
        return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials).pipe(
            tap(res => {
                this.setToken(res.access_token);
                this.router.navigate(['/']);
            })
        );
    }

    register(data: any) {
        return this.http.post(`${this.apiUrl}/register`, data);
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this.currentUser.set(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    private setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
        this.currentUser.set(token);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
