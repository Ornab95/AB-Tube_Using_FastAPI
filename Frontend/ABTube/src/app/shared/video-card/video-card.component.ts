import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Video } from '../../core/services/video.service';

@Component({
    selector: 'app-video-card',
    standalone: true,
    imports: [CommonModule, RouterLink, DatePipe],
    templateUrl: './video-card.component.html',
    styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
    @Input() video!: Video;

    getThumbnailUrl(): string {
        const category = this.video.category?.toLowerCase() || '';

        const thumbMap: { [key: string]: string } = {
            'ai': 'thumbnails/ai.png',
            'technology': 'thumbnails/technology.png',
            'programming': 'thumbnails/technology.png',
            'gaming': 'thumbnails/gaming.png',
            'music': 'thumbnails/music.png',
            'trending': 'thumbnails/trending.png',
            'news': 'thumbnails/trending.png',
            'movies': 'thumbnails/trending.png',
            'travel': 'thumbnails/travel.png',
            'food': 'thumbnails/food.png',
            'finance': 'thumbnails/trending.png' // Fallback
        };

        return thumbMap[category] || 'default-thumbnail.png';
    }
}
