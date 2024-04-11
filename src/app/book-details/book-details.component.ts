import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  id: number = 0;
  book: any;

  // Activated route is de huidige route
  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {
    // Hiermee lezen we de :id uit de routing
    this.id = this.activatedRoute.snapshot.params['id'];

    console.log('this.id', this.id);

    this.loadBook();
  }

  loadBook() {
    this.bookService.getBook(this.id).subscribe(book => {
      this.book = book;
    })
  }

}
