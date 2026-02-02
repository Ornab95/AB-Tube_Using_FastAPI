import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../core/services/video.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-upload',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent {
    fb = inject(FormBuilder);
    videoService = inject(VideoService);
    router = inject(Router);

    uploadForm: FormGroup;
    selectedFile: File | null = null;
    duration = '00:00';
    isUploading = false;

    categories = [
        'Trending', 'AI', 'Comedy', 'Crypto', 'Fashion', 'Finance', 'Food', 'Gaming',
        'Learning', 'Movies', 'Music', 'News', 'Programming', 'Sports', 'Technology',
        'Travel', 'Vlog', 'Other'
    ];

    constructor() {
        this.uploadForm = this.fb.group({
            title: ['', Validators.required],
            description: [''],
            category: ['Other', Validators.required]
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.extractDuration(file);
        }
    }

    extractDuration(file: File) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
            const duration = video.duration;
            const minutes = Math.floor(duration / 60);
            const seconds = Math.floor(duration % 60);
            this.duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };
        video.src = URL.createObjectURL(file);
    }

    onSubmit() {
        if (this.uploadForm.valid && this.selectedFile) {
            this.isUploading = true;
            const formData = new FormData();
            formData.append('title', this.uploadForm.get('title')?.value);
            formData.append('description', this.uploadForm.get('description')?.value);
            formData.append('category', this.uploadForm.get('category')?.value);
            formData.append('duration', this.duration);
            formData.append('file', this.selectedFile);

            const token = localStorage.getItem('access_token');
            if (token) {
                formData.append('token', token);
            }

            this.videoService.upload(formData).subscribe({
                next: () => {
                    this.isUploading = false;
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error('Upload error:', err);
                    alert(err.error?.detail || 'Upload failed');
                    this.isUploading = false;
                }
            });
        }
    }
}
