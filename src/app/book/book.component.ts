import { Component, Input } from '@angular/core';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // @Input() id: any;
  // @Input() title: String;
  // @Input() authors: String;
  // @Input() description: String;

  @Input() book: ReadBookDto | null = null;

  constructor(private router: Router) {
  }

  onSubmit() {
    
  }

  gotoBookDetailPage(book: ReadBookDto | null) {
    if (!!book) {
      // Routing naar detail pagina
      this.router.navigateByUrl('book/' + book.id);

      // window.location.href = '';
    }
  }

}