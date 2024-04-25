import { Component, ElementRef, NgModule, Output, ViewChild, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormBuilder, Validators, FormArray, NgModel, NgModelGroup, FormsModule } from '@angular/forms';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { CreateBookDto } from '../../dto/CreateBookDto';
import { ReadBookCopyDto } from '../../dto/ReadBookCopyDto';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {
  @ViewChild('closeModal') closeModal?: ElementRef;
  @ViewChild('openModal') openModal?: ElementRef;
  onSave = output<void>();
  bookForm: FormGroup;
  bookCopyList: ReadBookCopyDto[] = [];

  constructor(private bookService: BookService, private formBuilder: FormBuilder) {
      this.bookForm = this.formBuilder.group({
        title: new FormControl('', [Validators.required]),
        authors: new FormArray([], Validators.required),
        description: new FormControl('', [Validators.required]),
        isbn: new FormControl(''),
        publishingDate: new FormControl('', [Validators.required]),
        categories: new FormArray([], Validators.required),
        states: new FormArray([], Validators.required),
        nrCopies: new FormControl(''),
      }
    )
  }

  addAuthor() {
    this.authors.push(this.formBuilder.control('', Validators.required));
  }

  addCategory() {
    this.categories.push(this.formBuilder.control('', Validators.required));
  }

  addCopies(nrCopies: number) {
    for (let i = 0; i < nrCopies; i++) {
      this.states.push(this.formBuilder.control('NIEUW', Validators.required));
    }
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }

  removeCopy(index: number) {
    this.states.removeAt(index);
  }

  onSubmit(): void {
    let dto = new CreateBookDto();
    dto.title = this.bookForm.value.title;
    dto.description = this.bookForm.value.description;
    dto.isbn = this.bookForm.value.isbn;
    dto.publishingDate = this.bookForm.value.publishingDate;
    dto.authors = this.bookForm.value.authors;
    dto.categories = this.bookForm.value.categories;
    dto.states = this.bookForm.value.states;

    if(confirm("Weet je zeker dat je " + this.states.length + " exemplaren van het boek: '" + this.bookForm.value.title + "' wilt toevoegen?")) {
      this.bookService.addBook(dto).subscribe(response => {
        // Dit wordt uitgevoerd nadat we een reponse hebben ontvangen
        if (response.success) {
          this.bookCopyList = response.data;
          this.bookForm.reset();
          this.onSave.emit();
          console.log(response.data);
          this.openModal?.nativeElement.click();
        }
        else {
          alert(response.errors);
        }
      });
      // Close the modal after the user confirmed.
      this.closeModal?.nativeElement.click();
    }
  }

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  get states() {
    return this.bookForm.get('states') as FormArray;
  }

  get categories() {
    return this.bookForm.get('categories') as FormArray;
  }

  initializeForm() {
    this.addAuthor();
    this.addCategory();
  }

  resetForm() {
    this.bookForm.reset();
    this.authors.clear();
    this.states.clear();
    this.categories.clear()
  }

}
