import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    auth = inject(AuthService);
    router = inject(Router);
    private sidebarService = inject(SidebarService);

    logout() {
        this.auth.logout();
    }

    toggleSidebar() {
        this.sidebarService.toggle();
    }
}
