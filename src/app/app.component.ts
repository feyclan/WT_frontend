import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { BookComponent } from './book/book.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BookFormComponent,
    CatalogueComponent,
    BookComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WT_frontend';
}
