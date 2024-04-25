import { Component, Input } from '@angular/core';
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
import { DataSharingService } from '../data-sharing.service';

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
  @Input() trainerView: boolean = false;
  bookCopy: ReadBookCopyDto | null = null;
  book: ReadBookDto | null = null;
  user: ReadUserDto | null = null;
  role: string | null = null;
  innemenForm: FormGroup;
  modalTitle: string = 'Boek Innemen';

  // All services needed to access the proper end points
  constructor(
    private bookCopyService: BookCopyService,
    private userService: UserService,
    private bookService: BookService,
    private loanService: LoanService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private dataSharingService: DataSharingService
  ) {
    this.innemenForm = this.formBuilder.group({
      conditionEnd: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get all the foreign keys necessary to construct all the loan information
    if (this.loan) {
      this.getBookCopyById(this.loan.bookCopyId);
      this.getUserById(this.loan.userId);
      this.getBookById(this.loan.bookId);

      // default condition is conditionStart
      this.innemenForm.patchValue({
        conditionEnd: this.loan.conditionStart,
      });
    }

    // Get the role of the current user
    this.dataSharingService.userChangeObservable.subscribe(() => {
      this.role = localStorage.getItem('WT_ROLE');
    })
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

  // Reload the page to update the loan table after an action has been done
  reloadPage() {
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }

  // Open modal for boek innemen
  openConditionModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'save') {

        const updateLoanData = {
          id: this.loan?.id,
          endDate: new Date(),
          conditionEnd: this.innemenForm.value.conditionEnd,
          isActive: false
        }

        this.loanService.updateLoan(updateLoanData).subscribe(response => {
          if (response.success) {
            console.log('response', response);
            alert("Boek ingenomen")
          } else {
            alert(response.errors);
          }
        });
      }
    }, (reason) => {
      console.log('Boek inneming geanulleerd:', reason);
    });
  }
}