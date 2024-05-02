import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookFormComponent } from './components/book-form/book-form.component';
import { CatalogueComponent } from "./components/catalogue/catalogue.component";
import { BookComponent } from "./components/book/book.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserComponent } from './components/user/user.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookCopyListComponent } from './components/book-copy-list/book-copy-list.component';
import { BookCopyDetailsComponent } from './components/book-copy-details/book-copy-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BookFormComponent,
    CatalogueComponent,
    BookComponent,
    NavbarComponent,
    UserListComponent,
    UserComponent,
    ReservationListComponent,
    ReservationComponent,
    SearchBarComponent,
    BookCopyListComponent,
    BookCopyDetailsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WT_frontend';
}
