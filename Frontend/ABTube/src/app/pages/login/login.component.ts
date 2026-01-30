import { Component, inject } from '@angular/core';
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

    constructor() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const formData = new FormData();
            formData.append('username', this.loginForm.get('username')?.value);
            formData.append('password', this.loginForm.get('password')?.value);

            this.auth.login(formData).subscribe({
                error: (err) => {
                    console.error(err);
                    this.error = 'Invalid credentials';
                }
            });
        }
    }
}
