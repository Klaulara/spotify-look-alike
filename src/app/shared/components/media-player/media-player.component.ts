import { Component, ViewChild, ElementRef } from '@angular/core';
import { TrackModel } from '../../../core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';

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

  listObservers$: Array<Subscription> = [];

  constructor(private multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe(
      (response: TrackModel) => {
        console.log(response);
      }
    )
    this.listObservers$.push(observer1$);
  }
  ngOnDestroy(): void {
    this.listObservers$.forEach((observer: Subscription) => {
      observer.unsubscribe();
    });
  }
}
