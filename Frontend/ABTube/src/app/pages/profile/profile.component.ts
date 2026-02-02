import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AuthService } from '../../core/services/auth.service';
import { VideoService, Video } from '../../core/services/video.service';
import { VideoCardComponent } from '../../shared/video-card/video-card.component';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterLink, VideoCardComponent],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    auth = inject(AuthService);
    videoService = inject(VideoService);
    userVideos: Video[] = [];
    loading = true;

    ngOnInit() {
        this.loadUserVideos();
    }

    loadUserVideos() {
        // For now, we load all videos and filter by current user
        // In production, you'd want a dedicated endpoint like /api/my-videos
        this.videoService.getVideos().subscribe({
            next: (videos) => {
                // Filter videos uploaded by current user - this is a placeholder
                // You should get username from auth service or JWT
                this.userVideos = videos;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load videos', err);
                this.loading = false;
            }
        });
    }

    deleteVideo(videoId: number) {
        if (confirm('Are you sure you want to delete this video?')) {
            this.videoService.deleteVideo(videoId).subscribe({
                next: () => {
                    // Remove from local array
                    this.userVideos = this.userVideos.filter(v => v.id !== videoId);
                },
                error: (err) => {
                    console.error('Failed to delete video', err);
                    alert('Failed to delete video');
                }
            });
        }
    }
}
