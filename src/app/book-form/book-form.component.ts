import { Component, Output, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  onSave = output<void>(); // OutputEmitterRef<string>

  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        author: ['', Validators.required],
        description: ['', Validators.required],
      }
    )
  }

  onSubmit(): void {
    let dto = {
      title: this.bookForm.value.title,
      authors: [this.bookForm.value.author],
      description: this.bookForm.value.description
    }
    
    this.bookService.addBook(dto).subscribe(() => {
      // Dit wordt uitgevoerd nadat we een reponse hebben ontvangen
      alert('Boek is aangemaakt');

      this.bookForm.reset();

      this.onSave.emit();
    });
  }

}
