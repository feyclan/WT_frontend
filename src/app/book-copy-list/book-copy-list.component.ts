import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadBookCopyDto } from '../../dto/ReadBookCopyDto';
import { BookCopyService } from '../bookCopy.service';
import { CommonModule } from '@angular/common';
import { BookCopyDetailsComponent } from '../book-copy-details/book-copy-details.component';

@Component({
  selector: 'app-book-copy-list',
  standalone: true,
  imports: [CommonModule, BookCopyDetailsComponent],
  templateUrl: './book-copy-list.component.html',
  styleUrl: './book-copy-list.component.scss'
})
export class BookCopyListComponent {
  id: number = 0;
  bookCopies: ReadBookCopyDto[] | null = null;

  constructor(private activatedRoute: ActivatedRoute, private bookCopy: BookCopyService) {
    // Hiermee lezen we de :id uit de routing
    this.id = this.activatedRoute.snapshot.params['id'];
    
    this.loadBookCopies();
  }


  loadBookCopies(){
    this.bookCopy.getBookCopy(this.id).subscribe(response => {
      this.bookCopies = response.data;
    })
  }
}
