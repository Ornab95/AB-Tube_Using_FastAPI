import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Video {
    id: number;
    title: string;
    description: string;
    file_path: string;
    uploader: string;
    user_id: number;
    likes: number[];
    created_at: string;
}

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    private apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient) { }

    getVideos() {
        return this.http.get<Video[]>(`${this.apiUrl}/videos`);
    }

    getVideo(id: number | string) {
        return this.http.get<Video[]>(`${this.apiUrl}/videos`).pipe(
            map((videos: Video[]) => {
                const video = videos.find(v => v.id.toString() === id.toString());
                if (!video) {
                    console.error('Video not found. Available videos:', videos);
                    throw new Error('Video not found');
                }
                return video;
            })
        );
    }

    upload(formData: FormData) {
        return this.http.post(`${this.apiUrl}/upload`, formData);
    }

    like(id: number | string) {
        const formData = new FormData();
        const token = localStorage.getItem('access_token');
        if (token) formData.append('token', token);
        return this.http.post(`${this.apiUrl}/like/${id}`, formData);
    }

    checkLike(id: number | string) {
        const formData = new FormData();
        const token = localStorage.getItem('access_token');
        if (token) formData.append('token', token);
        return this.http.post<{ liked: boolean }>(`${this.apiUrl}/liked/${id}`, formData);
    }

    deleteVideo(id: number | string) {
        const formData = new FormData();
        const token = localStorage.getItem('access_token');
        if (token) formData.append('token', token);
        return this.http.request('delete', `${this.apiUrl}/video/${id}`, { body: formData });
    }
}
