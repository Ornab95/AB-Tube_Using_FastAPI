import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Video } from '../../core/services/video.service';

@Component({
    selector: 'app-video-card',
    standalone: true,
    imports: [CommonModule, RouterLink, DatePipe],
    templateUrl: './video-card.component.html',
    styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent {
    @Input() video!: Video;
}
