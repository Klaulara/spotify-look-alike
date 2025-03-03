import { Component } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import * as dataRaw from '../../../data/tracks.json';

@Component({
  selector: 'app-play-list-body',
  standalone: false,
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.css'
})
export class PlayListBodyComponent {
  tracks: Array<TrackModel> = [];
  optionsSort: {property: string | null, order: string} = {property: null, order: 'asc'}
  constructor() { }

  ngOnInit() {
    const { data }: any = (dataRaw as any).default;
    this.tracks = data;
  }
  changeSort(property:string): void {
    const { order } = this.optionsSort;
    this.optionsSort = {
      property,
      order: (order === 'asc') ? 'desc' : 'asc'
    };
  }
}
