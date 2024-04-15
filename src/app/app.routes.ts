import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

export const routes: Routes = [
    {path: 'book-form', component: BookFormComponent},
    {path: 'catalogue', component: CatalogueComponent},
    {path: 'book/:id', component: BookDetailsComponent},
    {path: 'users', component: UserListComponent},
    {path: 'reservations', component: ReservationListComponent},

];
