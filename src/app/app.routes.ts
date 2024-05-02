import { Routes } from '@angular/router';
import { BookFormComponent } from './components/book-form/book-form.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { LoginComponent } from './components/login/login.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { BookCopyListComponent } from './components/book-copy-list/book-copy-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


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
