import { CommonModule, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReadBookDto } from "../../../dto/ReadBookDto";
import { BookFormComponent } from "../book-form/book-form.component";
import { BookService } from "../../services/book.service";
import { BookComponent } from "../book/book.component";
import { AddCopiesComponent } from "../add-copies/add-copies.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { FilterSideBarComponent } from "../filter-side-bar/filter-side-bar.component";

@Component({
  selector: "app-catalogue",
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    BookComponent,
    BookFormComponent,
    AddCopiesComponent,
    SearchBarComponent,
  ],
  templateUrl: "./catalogue.component.html",
  styleUrl: "./catalogue.component.scss",
})
export class CatalogueComponent implements OnInit {
  books = new Array<ReadBookDto>();
  uniqueCategories = new Set<string>();
  uniqueAuthors = new Set<string>();
  totalPages: number = 0;
  currentPage: number = 1;
  searchTerm: string = "";
  searchPlaceholder: string = "Zoek op titel";

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks(1);
  }

  loadBooks(pageNr: number) {
    let dto = {
      searchTerm: this.searchTerm,
      pageNr: pageNr - 1,
    };
    this.bookService.searchBooks(dto).subscribe((response) => {
      this.books = response.data.books;
      this.totalPages = response.data.totalPages;
      this.currentPage = pageNr;

      this.books.forEach((book) => {
        if (book.categories) {
          book.categories.forEach((category) => {
            this.uniqueCategories.add(category);
          });
        }
        if (book.authors) {
          book.authors.forEach((author) => {
            this.uniqueAuthors.add(author);
          });
        }
      });

      console.log(Array.from(this.uniqueCategories));
      console.log(Array.from(this.uniqueAuthors));
    });
  }

  clearCategories() {
    this.uniqueCategories.clear();
  }

  clearAuthors() {
    this.uniqueAuthors.clear();
  }

  hasCreatePermission() {
    let role = localStorage.getItem("WT_ROLE");

    return !!role && role == "TRAINER";
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    console.log(this.currentPage);
    this.loadBooks(page);
  }

  get visiblePages(): number[] {
    const totalPagesToShow = 5;
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + totalPagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.clearCategories();
    this.clearAuthors();
    this.loadBooks(1);
  }
}
