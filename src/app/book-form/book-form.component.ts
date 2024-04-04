import { Component } from '@angular/core';
import { AddBookService } from '../add-book.service';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})

export class BookFormComponent {
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });

  onSubmit(): void {
    let json: object;

    json = {
      title: this.bookForm.value.title,
      authors: [this.bookForm.value.author],
      description: this.bookForm.value.description
    };
    this.bookService.addBook((json)).subscribe();
    this.bookForm.reset();

  }

  constructor(private bookService: AddBookService) {}


}
