import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-card-player',
  standalone: false,
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.css'
})
export class CardPlayerComponent {
  @Input() mode: 'small' | 'large' = 'small';
  @Input() track: TrackModel = {
    _id: '',
    name: '',
    album: '',
    cover: '',
    url: ''
  }

  constructor() {}

  ngOnInit(): void {}
}
