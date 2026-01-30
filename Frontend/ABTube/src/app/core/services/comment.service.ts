import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Comment {
    id: string;
    username: string;
    text: string;
    timestamp: string;
}

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient) { }

    getComments(videoId: string) {
        return this.http.get<Comment[]>(`${this.apiUrl}/comment/${videoId}`);
    }

    addComment(videoId: string, text: string) {
        return this.http.post(`${this.apiUrl}/comment/${videoId}`, { text });
    }
}
