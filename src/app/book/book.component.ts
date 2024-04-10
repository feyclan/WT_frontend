import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  @Input() id: any;
  @Input() title: String;
  @Input() authors: String;
  @Input() description: String;

  constructor() {
    this.id = 0;
    this.title = "";
    this.authors = "";
    this.description = "";
  }

  onSubmit() {
    
  }
}