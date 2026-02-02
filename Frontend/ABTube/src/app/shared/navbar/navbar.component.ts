import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    auth = inject(AuthService);
    router = inject(Router);
    sidebarService = inject(SidebarService);
    themeService = inject(ThemeService);
    elementRef = inject(ElementRef);
    searchQuery = '';
    isDropdownOpen = false;

    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isDropdownOpen && !this.elementRef.nativeElement.contains(event.target)) {
            this.isDropdownOpen = false;
        }
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    closeDropdown() {
        this.isDropdownOpen = false;
    }

    logout() {
        this.auth.logout();
        this.closeDropdown();
    }

    toggleSidebar() {
        this.sidebarService.toggle();
    }
}
