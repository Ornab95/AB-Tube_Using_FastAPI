import { Component, Input, OnInit, OnChanges, SimpleChanges, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { VideoService, Video } from '../../core/services/video.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommentService, Comment } from '../../core/services/comment.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-video-player',
    standalone: true,
    imports: [CommonModule, DatePipe, FormsModule],
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit, OnChanges {
    videoService = inject(VideoService);
    commentService = inject(CommentService);
    auth = inject(AuthService);
    cdr = inject(ChangeDetectorRef);

    @Input() id!: string; // From router parameter
    video: Video | null = null;
    comments: Comment[] = [];
    newComment = '';
    isLiked = false;

    ngOnInit() {
        if (this.id) {
            this.loadAll(this.id);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['id'] && changes['id'].currentValue) {
            this.loadAll(changes['id'].currentValue);
        }
    }

    loadAll(id: string | number) {
        this.loadVideo(id);
        this.loadComments(id);
        this.loadLikeStatus(id);
    }

    loadVideo(id: number | string) {
        console.log('Loading video with ID:', id);
        this.videoService.getVideo(id).subscribe({
            next: (v) => {
                console.log('Video loaded:', v);
                this.video = v;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Failed to load video', err);
                alert('Failed to load video: ' + err.message);
            }
        });
    }

    loadComments(id: number | string) {
        this.commentService.getComments(id).subscribe({
            next: (c) => this.comments = c,
            error: (err) => console.error('Failed to load comments', err)
        });
    }

    loadLikeStatus(id: number | string) {
        if (this.auth.isAuthenticated()) {
            this.videoService.checkLike(id).subscribe({
                next: (res) => this.isLiked = res.liked,
                error: () => this.isLiked = false
            });
        }
    }

    likeVideo() {
        if (!this.video || !this.auth.isAuthenticated()) return;
        this.videoService.like(this.video.id).subscribe(() => {
            // Toggle like state and reload video
            this.isLiked = !this.isLiked;
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

    deleteComment(commentId: string) {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        this.commentService.deleteComment(commentId).subscribe({
            next: () => {
                if (this.video) this.loadComments(this.video.id);
            },
            error: (err) => console.error('Failed to delete comment', err)
        });
    }
}
