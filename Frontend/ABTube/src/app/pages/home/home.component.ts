import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService, Video } from '../../core/services/video.service';
import { VideoCardComponent } from '../../shared/video-card/video-card.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, VideoCardComponent, NavbarComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    videoService = inject(VideoService);
    videos: Video[] = [];
    loading = true;

    ngOnInit() {
        this.videoService.getVideos().subscribe({
            next: (data) => {
                this.videos = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load videos', err);
                this.loading = false;
            }
        });
    }
}
