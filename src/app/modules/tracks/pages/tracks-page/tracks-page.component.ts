import { TrackModel } from './../../../../core/models/tracks.model';
import { Component } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  standalone: false,
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent {
  tracksTrending: Array<TrackModel> = [];
  tracksRandom: Array<TrackModel> = [];

  listObservers$: Array<Subscription> = [];

  constructor(private trackService: TrackService) {
   }

  ngOnInit(): void {
    this.loadDataAll();
    this.loadDataRandom();
  }

  async loadDataAll(): Promise<any> {
    try {
      this.tracksTrending = await this.trackService.getAllTracks$().toPromise();
    } catch (error) {
      console.error('Error loadDataAll', error);
    }
  }

  async loadDataRandom(): Promise<any> {
    try {
      this.tracksRandom = await this.trackService.getAllRandom$().toPromise();
    } catch (error) {
      console.error('Error loadDataRandom', error);
    }
  }

  ngOnDestroy(): void {

  }
}
