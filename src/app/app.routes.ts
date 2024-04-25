import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { LoginComponent } from './login/login.component';
import { LoanListComponent } from './loan-list/loan-list.component';
import { BookCopyListComponent } from './book-copy-list/book-copy-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';


export const routes: Routes = [
    {path: 'book-form', component: BookFormComponent},
    {path: 'catalogue', component: CatalogueComponent},
    {path: 'book/:id', component: BookDetailsComponent},
    {path: 'users', component: UserListComponent},
    {path: 'user/:id', component: UserDetailsComponent},
    {path: 'reservations', component: ReservationListComponent},
    {path: 'loans', component: LoanListComponent},
    {path: 'login', component: LoginComponent},
    {path: 'bookCopies/:id', component: BookCopyListComponent}
];
