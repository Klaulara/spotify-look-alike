import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Pipe({
  name: 'orderList',
  standalone: false
})
export class OrderListPipe implements PipeTransform {

  transform(value: Array<any>, args: string | null = null, sort: string | 'asc'): TrackModel[] {
    try {
      if (args === null) {
        return value;
      } else {
        const tmpList = value.sort((a, b) => {
          if (a[args] < b[args]) {
            return -1;
          } else if (a[args] > b[args]) {
            return 1;
          } else if (a[args] === b[args]) {
            return 0;
          }
          return 1;
        });
        return (sort === 'asc') ? tmpList : tmpList.reverse();
      }
    } catch (error) {
      console.error('Error en el pipe orderList', error);
      return value;
    }
  }

}
