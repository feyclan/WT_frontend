import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { BookFormComponent } from '../book-form/book-form.component';
import { BookService } from '../book.service';
import { BookComponent } from '../book/book.component';
import { AddCopiesComponent } from '../add-copies/add-copies.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [NgFor, CommonModule, BookComponent, BookFormComponent, AddCopiesComponent, SearchBarComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.scss'
})
export class CatalogueComponent implements OnInit {

  books = new Array<ReadBookDto>();
  totalPages: number = 0;
  currentPage: number = 1;
  totalPagesArray: number[] = [];
  searchTerm: string = "";
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks(1);
  }


  loadBooks(pageNr: number) {
      let dto = {
        title: this.searchTerm,
        pageNr: pageNr - 1
      };
      this.bookService.searchBooks(dto).subscribe((response) => {
        this.books = response.data.books;
        this.totalPages = response.data.totalPages;
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.currentPage = pageNr;
      })     
  }

  hasCreatePermission() {
    let role = localStorage.getItem('WT_ROLE');

    return !!role && role == 'TRAINER';
  }

  setPage(page: number){
    if(page < 1 || page > this.totalPages){
      return;
    }

    this.currentPage = page;
    console.log(this.currentPage);
    this.loadBooks(page);
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.loadBooks(1);
  }

}
