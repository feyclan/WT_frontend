import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetBooksService } from '../get-books.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [NgFor, CommonModule, BookComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {
  books = new Array<any>();

  ngOnInit(): void {
    this.catalogueService.getBooks().subscribe((data) => {
      this.books = data;
      console.log(data);
    });
  }
  constructor(private catalogueService: GetBooksService) {}
}
