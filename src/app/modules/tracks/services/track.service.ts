import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id);
      resolve(listTmp)
    })
  }

  getAllTracks$(): Observable<any> {
    return this.httpClient.get<TrackModel[]>(`${this.URL}/tracks`)
      .pipe(
        map(({data}: any)=> {
          return data;
        })
      )
  }

  getAllRandom$(): Observable<any> {
    return this.httpClient.get<TrackModel[]>(`${this.URL}/tracks`)
      .pipe(
        mergeMap(({ data }: any) => this.skipById(data, 2)),
        catchError((error) => {
          const { status, statusText } = error;
          return of([]);
        })
      )
  }
}
