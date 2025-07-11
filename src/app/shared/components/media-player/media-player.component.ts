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
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef(null);
  listObservers$: Array<Subscription> = [];
  state: string = "paused";

  constructor(public multimediaService: MultimediaService) { }

  ngOnInit(): void {
    const observer1$ = this.multimediaService.playerStatus$
      .subscribe((status: string) => {
        this.state = status;
      });
    this.listObservers$ = [observer1$];
  }
  ngOnDestroy(): void {
    this.listObservers$.forEach((observer: Subscription) => {
      observer.unsubscribe();
    });
  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event;
    const { x, width } = elNative.getBoundingClientRect();
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100)/ width;
    this.multimediaService.seekAudio(percentageFromX);
  }
}
