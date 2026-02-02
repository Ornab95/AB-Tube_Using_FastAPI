import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    fb = inject(FormBuilder);
    auth = inject(AuthService);

    loginForm: FormGroup;
    error = '';
    showPassword = signal(false);

    constructor() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    togglePassword() {
        this.showPassword.update(value => !value);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.auth.login(this.loginForm.value).subscribe({
                error: (err) => {
                    console.error(err);
                    this.error = err.error?.detail || 'Invalid credentials';
                }
            });
        }
    }
}
