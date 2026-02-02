import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService, Video } from '../../core/services/video.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { VideoCardComponent } from '../../shared/video-card/video-card.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, VideoCardComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    videoService = inject(VideoService);
    sidebarService = inject(SidebarService);

    videos = signal<Video[]>([]);
    loading = signal(true);
    error = signal('');

    ngOnInit() {
        this.videoService.getVideos().subscribe({
            next: (data) => {
                this.videos.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                console.error('Failed to load videos', err);
                this.error.set('Failed to load videos. Please try again later.');
                this.loading.set(false);
            }
        });
    }
}
