import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import * as tracks from '../../../../data/tracks.json';

@Component({
  selector: 'app-tracks-page',
  standalone: false,
  templateUrl: './tracks-page.component.html',
  styleUrl: './tracks-page.component.css'
})
export class TracksPageComponent {
  mockTracksList: Array<TrackModel> = [];
  constructor () {}

  ngOnInit(): void {
    const { data }: any = (tracks as any).default;
    this.mockTracksList = data;
  }
}
