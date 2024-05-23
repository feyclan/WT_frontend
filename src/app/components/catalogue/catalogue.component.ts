import { CommonModule, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ReadBookDto } from "../../../dto/ReadBookDto";
import { BookFormComponent } from "../book-form/book-form.component";
import { BookService } from "../../services/book.service";
import { BookComponent } from "../book/book.component";
import { AddCopiesComponent } from "../add-copies/add-copies.component";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { FormsModule } from "@angular/forms";
import { AuthorService } from "../../author.service";

@Component({
  selector: "app-catalogue",
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    AddCopiesComponent,
    BookComponent,
    BookFormComponent,
    SearchBarComponent,
    FormsModule,
  ],
  templateUrl: "./catalogue.component.html",
  styleUrls: ["./catalogue.component.scss"],
})
export class CatalogueComponent implements OnInit {
  authorSelections: { [key: string]: boolean } = {};
  categorySelections: { [key: string]: boolean } = {};
  selectedAuthors = new Set<string>();
  selectedCategories = new Set<string>();
  filteredBooks = new Array<ReadBookDto>();
  books = new Array<ReadBookDto>();
  uniqueCategories = new Set<string>();
  uniqueAuthors = new Set<string>();
  totalPages: number = 0;
  currentPage: number = 1;
  searchTerm: string = "";
  searchPlaceholder: string =
    "Zoek op titel, auteur, categorie of beschrijving...";

  showMoreAuthors: boolean = false;
  showMoreCategories: boolean = false;

  constructor(private bookService: BookService, private authorService: AuthorService) {}

  ngOnInit(): void {
    this.loadBooks(1);
  }

  onAuthorToggle(author: string) {
    if (this.authorSelections[author]) {
      this.selectedAuthors.add(author);
    } else {
      this.selectedAuthors.delete(author);
    }
    this.applyFilters();
  }

  onCategoryToggle(category: string) {
    if (this.categorySelections[category]) {
      this.selectedCategories.add(category);
    } else {
      this.selectedCategories.delete(category);
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredBooks = this.books.filter(
      (book) =>
        (this.selectedAuthors.size === 0 ||
          book.authors.some((author) => this.selectedAuthors.has(author))) &&
        (this.selectedCategories.size === 0 ||
          book.categories.some((category) =>
            this.selectedCategories.has(category)
          ))
    );
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
            book.categories.forEach((category) => {
                this.uniqueCategories.add(category);
                if (!(category in this.categorySelections)) {
                    this.categorySelections[category] = false;
                }
            });
        });

        // Fetch authors and map them
        this.authorService.searchKeyword(dto).subscribe(authorResponse => {
            this.uniqueAuthors.clear(); // Clear previous authors
            authorResponse.forEach((author) => {
                this.uniqueAuthors.add(author.name);
                if (!(author.name in this.authorSelections)) {
                    this.authorSelections[author.name] = false;
                }
            });

            // Apply filters if any are selected
            if (this.selectedAuthors.size > 0 || this.selectedCategories.size > 0) {
                this.applyFilters();
            } else {
                this.filteredBooks = this.books;
            }
        });
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

  get visibleAuthors(): string[] {
    const authorsArray = Array.from(this.uniqueAuthors);
    return this.showMoreAuthors ? authorsArray : authorsArray.slice(0, 5);
  }

  get visibleCategories(): string[] {
    const categoriesArray = Array.from(this.uniqueCategories);
    return this.showMoreCategories
      ? categoriesArray
      : categoriesArray.slice(0, 5);
  }

  toggleShowMoreAuthors() {
    this.showMoreAuthors = !this.showMoreAuthors;
  }

  toggleShowMoreCategories() {
    this.showMoreCategories = !this.showMoreCategories;
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.clearCategories();
    this.clearAuthors();
    this.loadBooks(1);
  }
}