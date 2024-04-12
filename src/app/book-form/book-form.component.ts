import { Component, Output, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  onSave = output<void>();

  bookForm: FormGroup;

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {
      this.bookForm = this.formBuilder.group({
        title: new FormControl('', [Validators.required]),
        authors: new FormArray([], Validators.required),
        description: new FormControl('', [Validators.required]),
      }
    )
  }

  // ngOnInit(): void {
  //   this.addAuthor();
  // }

  addAuthor() {
    this.authors.push(this.formBuilder.control('', Validators.required));
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  onSubmit(): void {
    let dto = {
      title: this.bookForm.value.title,
      authors: this.bookForm.value.authors,
      description: this.bookForm.value.description
    }

    this.bookService.addBook(dto).subscribe(() => {
      // Dit wordt uitgevoerd nadat we een reponse hebben ontvangen
      alert('Boek is aangemaakt');

      this.bookForm.reset();

      this.onSave.emit();
    });
  }

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  resetForm() {
    this.bookForm.reset();
    this.authors.clear();
  }

}
