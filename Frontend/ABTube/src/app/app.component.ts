import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'ABTube';
    private router = inject(Router);
    private activatedRoute = inject(ActivatedRoute);
    showLayout = true;

    constructor() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            let route = this.activatedRoute;
            while (route.firstChild) {
                route = route.firstChild;
            }
            this.showLayout = !route.snapshot.data['hideLayout'];
        });
    }
}
