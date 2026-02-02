import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface Comment {
    id: string;
    username: string;
    user_id: string;
    text: string;
    timestamp: string;
}

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = 'http://localhost:8000/api';

    private auth = inject(AuthService);

    constructor(private http: HttpClient) { }

    getComments(videoId: number | string) {
        return this.http.get<Comment[]>(`${this.apiUrl}/comment/${videoId}`);
    }

    addComment(videoId: number | string, text: string) {
        const formData = new FormData();
        formData.append('token', this.auth.getToken() || '');
        formData.append('comment', text);
        return this.http.post(`${this.apiUrl}/comment/${videoId}`, formData);
    }

    deleteComment(id: string) {
        const formData = new FormData();
        formData.append('token', this.auth.getToken() || '');
        return this.http.request<{ message: string }>('delete', `${this.apiUrl}/comment/${id}`, { body: formData });
    }
}
