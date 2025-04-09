import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  standalone: false,
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {

  listResults$: Observable<any> = of([]);
  constructor(private seachService: SearchService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  receiveData(event: string): void {
    this.listResults$ = this.seachService.searchTracks$(event)
  }

}
