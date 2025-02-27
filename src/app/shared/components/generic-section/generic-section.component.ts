import { Component, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-generic-section',
  standalone: false,
  templateUrl: './generic-section.component.html',
  styleUrl: './generic-section.component.css'
})
export class GenericSectionComponent {
  @Input() title: string = '';
  @Input() mode: 'small' | 'large' = 'large';
  @Input() dataTracks: Array<TrackModel> = [];
  constructor() { }

  ngOnInit(): void {}
}
