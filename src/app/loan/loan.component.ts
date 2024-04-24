import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { LoanDto } from '../../dto/ReadLoanDto';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { UserService } from '../user.service';
import { BookCopyService } from '../bookCopy.service';
import { BookService } from '../book.service';
import { LoanService } from '../loan.service';
import { ReadBookCopyDto } from '../../dto/ReadBookCopyDto';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: '[app-loan]',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss'
})
export class LoanComponent {

  // Every DTO needed to construct the proper information from the root- and foreign tables
  @Input() loan: LoanDto | null = null;
  @Input() isReservationList: boolean = false; // Input to indicate whether it's being used in the reservation list
  bookCopy: ReadBookCopyDto | null = null;
  book: ReadBookDto | null = null;
  user: ReadUserDto | null = null;
  innemenForm: FormGroup;
  modalTitle: string = 'Boek Innemen';

  // All services needed to access the proper end points
  constructor(
    private bookCopyService: BookCopyService,
    private userService: UserService,
    private bookService: BookService,
    private loanService: LoanService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) {
    this.innemenForm = this.formBuilder.group({
      conditionEnd: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  // Get all the foreign keys necessary to construct all the loan information
  ngOnInit(): void {
    if (this.loan) {
      this.getBookCopyById(this.loan.bookCopyId);
      this.getUserById(this.loan.userId);
      this.getBookById(this.loan.bookId);
    }
  }

  // Get all the info of the foreign tables by the provided ID
  getBookCopyById(id: any) {
    this.bookCopyService.getBookCopy(id).subscribe(resp => {
      this.bookCopy = resp.data;
    });
  }

  getUserById(id: any) {
    this.userService.getUser(id).subscribe(resp => {
      this.user = resp.data;
    });
  }

  getBookById(id: any) {
    this.bookService.getBook(id).subscribe(resp => {
      this.book = resp.data;
    })
  }

  // Open modal for boek innemen
  openConditionModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'save') {

        if (this.loan) {
          this.loan.conditionEnd = this.innemenForm.value.conditionEnd;
          this.loan.endDate = this.innemenForm.value.endDate;
          this.loan.isActive = false;

          this.loanService.updateLoan(this.loan).subscribe(response => {
            if (response.success) {
              console.log('response', response);
              alert("Boek ingenomen")
            } else {
              alert(response.errors);
            }
          });
        }
      }
    }, (reason) => {
      console.log('Boek inneming geanulleerd:', reason);
    });
  }
}
