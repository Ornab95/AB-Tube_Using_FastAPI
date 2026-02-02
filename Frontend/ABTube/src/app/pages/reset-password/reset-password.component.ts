import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
    fb = inject(FormBuilder);
    authService = inject(AuthService);
    router = inject(Router);

    resetForm: FormGroup;
    message = '';
    error = '';
    isLoading = false;

    constructor() {
        this.resetForm = this.fb.group({
            token: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.resetForm.valid) {
            this.isLoading = true;
            this.error = '';
            this.message = '';

            const { token, newPassword } = this.resetForm.value;

            this.authService.resetPassword(token, newPassword).subscribe({
                next: (res) => {
                    this.message = res.message;
                    this.isLoading = false;
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 2000);
                },
                error: (err) => {
                    this.error = err.error.detail || 'Something went wrong';
                    this.isLoading = false;
                }
            });
        }
    }
}
