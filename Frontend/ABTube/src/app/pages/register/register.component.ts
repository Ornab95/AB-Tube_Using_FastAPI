import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    fb = inject(FormBuilder);
    auth = inject(AuthService);
    router = inject(Router);

    registerForm: FormGroup;
    error = '';

    constructor() {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const formData = new FormData();
            formData.append('username', this.registerForm.get('username')?.value);
            formData.append('email', this.registerForm.get('email')?.value);
            formData.append('password', this.registerForm.get('password')?.value);

            this.auth.register(formData).subscribe({
                next: () => {
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.error(err);
                    this.error = 'Registration failed. Try again.';
                }
            });
        }
    }
}
