import { Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { BookDetailsComponent } from './book-details/book-details.component';

export const routes: Routes = [
    {path: 'book-form', component: BookFormComponent},
    {path: 'catalogue', component: CatalogueComponent},
    {path: 'book/:id', component: BookDetailsComponent},
];
