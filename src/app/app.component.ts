import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { BookComponent } from './book/book.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BookCopyListComponent } from './book-copy-list/book-copy-list.component';
import { BookCopyDetailsComponent } from './book-copy-details/book-copy-details.component';

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
