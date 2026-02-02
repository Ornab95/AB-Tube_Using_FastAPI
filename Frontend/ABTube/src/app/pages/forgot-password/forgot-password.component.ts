import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
    fb = inject(FormBuilder);
    authService = inject(AuthService);

    forgotForm: FormGroup;
    message = '';
    error = '';
    isLoading = false;

    constructor() {
        this.forgotForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if (this.forgotForm.valid) {
            this.isLoading = true;
            this.error = '';
            this.message = '';

            this.authService.forgotPassword(this.forgotForm.value.email).subscribe({
                next: (res) => {
                    this.message = res.message;
                    this.isLoading = false;
                },
                error: (err) => {
                    this.error = err.error.detail || 'Something went wrong';
                    this.isLoading = false;
                }
            });
        }
    }
}
