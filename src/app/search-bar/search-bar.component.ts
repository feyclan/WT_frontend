import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchTerm: string = '';
  searchTermChanged: Subject<string> = new Subject<string>();
  //The search term is emitted to the parent component
  @Output() searchEvent = new EventEmitter<string>();

  constructor() {
    this.searchTermChanged.pipe(
      debounceTime(300) //This is the time in ms it waits to emit te search term.
    ).subscribe(searchTerm => {
      this.searchEvent.emit(searchTerm);
    });
  }

  //Emits the value to parent component
  search() {
    this.searchEvent.emit(this.searchTerm);
  }
  //Called whenever the value of the input changes
  onSearchTermChanged() {
    this.searchTermChanged.next(this.searchTerm);
  }
}
