import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookService } from '../book.service';
import { BookComponent } from '../book/book.component';
import { AddCopiesComponent } from '../add-copies/add-copies.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [NgFor, CommonModule, BookComponent, BookFormComponent, AddCopiesComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {

  books = new Array<ReadBookDto>();
  page: number = 0;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks(this.page).subscribe((response) => {
      this.books = response.data.books;
    });
  }

  hasCreatePermission() {
    let role = localStorage.getItem('WT_ROLE');

    return !!role && role == 'TRAINER';
  }

}
