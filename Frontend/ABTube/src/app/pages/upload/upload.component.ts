import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VideoService } from '../../core/services/video.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
    selector: 'app-upload',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, NavbarComponent],
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent {
    fb = inject(FormBuilder);
    videoService = inject(VideoService);
    router = inject(Router);

    uploadForm: FormGroup;
    selectedFile: File | null = null;
    isUploading = false;

    constructor() {
        this.uploadForm = this.fb.group({
            title: ['', Validators.required],
            description: ['']
        });
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0] || null;
    }

    onSubmit() {
        if (this.uploadForm.valid && this.selectedFile) {
            this.isUploading = true;
            const formData = new FormData();
            formData.append('title', this.uploadForm.get('title')?.value);
            formData.append('description', this.uploadForm.get('description')?.value);
            formData.append('file', this.selectedFile);

            this.videoService.upload(formData).subscribe({
                next: () => {
                    this.isUploading = false;
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error(err);
                    this.isUploading = false;
                }
            });
        }
    }
}
