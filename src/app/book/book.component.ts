import { Component, Input, output } from '@angular/core';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../book.service';
import { CatalogueComponent } from '../catalogue/catalogue.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, CatalogueComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  @Input() book: ReadBookDto | null = null;

  onDelete = output<void>();

  constructor(private router: Router, private bookService: BookService) {
  }

  gotoBookDetailPage(book: ReadBookDto | null) {
    if (!!book) {
      // Routing naar detail pagina
      this.router.navigateByUrl('book/' + book.id);

      // window.location.href = '';
    }
  }

  deleteBook() {
    if (!!this.book){
      this.bookService.deleteBook(this.book.id).subscribe(() => {
        alert("Boek is verwijderd")
        this.onDelete.emit();
      });
    }
  }

}