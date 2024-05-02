import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookCopyService } from "../../services/bookCopy.service";
import { ReadBookDto } from '../../../dto/ReadBookDto';
import { ReadBookCopyDto } from '../../../dto/ReadBookCopyDto';
import { BookComponent } from '../book/book.component';
import { CatalogueComponent } from '../catalogue/catalogue.component';

@Component({
  selector: 'app-add-copies',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BookComponent, CatalogueComponent],
  templateUrl: './add-copies.component.html',
  styleUrl: './add-copies.component.scss'
})
export class AddCopiesComponent {

  @Input() bookAddCopy: ReadBookDto | null = null;

  @ViewChild('closeModal') closeModal?: ElementRef;
  @ViewChild('openModal') openModal?: ElementRef;
  addCopiesForm: FormGroup;
  bookCopyList: ReadBookCopyDto[] = [];

  constructor(private bookCopyService: BookCopyService, private formBuilder: FormBuilder) {
    this.addCopiesForm = this.formBuilder.group({
      states: new FormArray([], Validators.required),
      nrCopies: new FormControl(''),
    });
  }

  addCopies(nrCopies: number) {
    for (let i = 0; i < nrCopies; i++) {
      this.states.push(this.formBuilder.control('NIEUW', Validators.required));
    }
  }

  removeCopy(index: number) {
    this.states.removeAt(index);
  }

  resetForm() {
    this.addCopiesForm.reset();
    this.states.clear();
  }

  onSubmit(): void {
    let dto = {
      states:  this.states.value,
      bookId: this.bookAddCopy?.id
    }

    if(confirm("Weet je zeker dat je " + this.states.length + " exemplaren van het boek: '" + this.bookAddCopy?.title + "' wilt toevoegen?")) {
      this.bookCopyService.createBookCopy(dto).subscribe(response => {
        console.log("request", dto);
        // Dit wordt uitgevoerd nadat we een reponse hebben ontvangen
        if (response.success) {
          this.bookCopyList = response.data;
          this.addCopiesForm.reset();
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

  get states() {
    return this.addCopiesForm.get('states') as FormArray;
  }

}
