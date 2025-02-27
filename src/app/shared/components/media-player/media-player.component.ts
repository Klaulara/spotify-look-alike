import { Component, ViewChild, ElementRef } from '@angular/core';
import { TrackModel } from '../../../core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  standalone: false,
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent {
  mockCover: TrackModel = {
    cover: 'blablabla.png',
    album: 'Seventh Son of a Seventh Son',
    name: 'Iron Maiden',
    url: 'https://www.youtube.com/watch?v=7jTgkTEDDog',
    _id: '1',
  }
}
