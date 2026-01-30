import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
    providedIn: 'root'
})
export class VideoService {
    private apiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient) { }

    getVideos() {
        return this.http.get<Video[]>(`${this.apiUrl}/videos`);
    }

    getVideo(id: string) {
        return this.http.get<Video>(`${this.apiUrl}/video/${id}`);
    }

    upload(formData: FormData) {
        return this.http.post(`${this.apiUrl}/upload`, formData);
    }

    like(id: string) {
        return this.http.post(`${this.apiUrl}/like/${id}`, {});
    }
}
