import { Injectable, signal, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    isDark = signal<boolean>(false);

    constructor() {
        // Load saved theme or default to light (false)
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.isDark.set(true);
        } else if (savedTheme === 'light') {
            this.isDark.set(false);
        } else {
            // System preference check could go here, defaulting to light for Cloud Nine
            this.isDark.set(false);
        }

        // Effect to apply class and save to local storage
        effect(() => {
            if (this.isDark()) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    toggleTheme() {
        this.isDark.update(d => !d);
    }
}
