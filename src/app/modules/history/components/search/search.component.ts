import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  @Output() callbackData: EventEmitter<any> = new EventEmitter<any>();
  src: string = ' '

  constructor() {}

  ngOnInit(): void {}

  callSearch(term: string): void {
    if(term.length > 3) {
      this.callbackData.emit(term);
    }
  }

}
