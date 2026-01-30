import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VideoService, Video } from '../../core/services/video.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommentService, Comment } from '../../core/services/comment.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-video-player',
    standalone: true,
    imports: [CommonModule, NavbarComponent, DatePipe, FormsModule],
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
    videoService = inject(VideoService);
    commentService = inject(CommentService);
    auth = inject(AuthService);

    @Input() id!: string; // From router parameter
    video: Video | null = null;
    comments: Comment[] = [];
    newComment = '';

    ngOnInit() {
        if (this.id) {
            this.loadVideo(this.id);
            this.loadComments(this.id);
        }
    }

    loadVideo(id: string) {
        this.videoService.getVideo(id).subscribe(v => this.video = v);
    }

    loadComments(id: string) {
        this.commentService.getComments(id).subscribe(c => this.comments = c);
    }

    likeVideo() {
        if (!this.video || !this.auth.isAuthenticated()) return;
        this.videoService.like(this.video.id).subscribe(() => {
            // Optimistic update mechanism or reload
            // For now, reload video to get new like count/status
            if (this.video) this.loadVideo(this.video.id);
        });
    }

    postComment() {
        if (!this.newComment.trim() || !this.video) return;
        this.commentService.addComment(this.video.id, this.newComment).subscribe(() => {
            this.newComment = '';
            if (this.video) this.loadComments(this.video.id);
        });
    }
}
