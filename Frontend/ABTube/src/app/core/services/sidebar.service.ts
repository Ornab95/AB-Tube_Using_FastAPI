import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    private _isOpen = signal(window.innerWidth > 768);

    isOpen = this._isOpen.asReadonly();

    toggle(): void {
        this._isOpen.update(value => !value);
    }

    open(): void {
        this._isOpen.set(true);
    }

    close(): void {
        this._isOpen.set(false);
    }
}
