import { Component, Input } from '@angular/core';
import { LoanDto } from '../../dto/ReadLoanDto';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { UserService } from '../user.service';
import { BookCopyService } from '../bookCopy.service';
import { ReadBookCopyDto } from '../../dto/ReadBookCopyDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[app-loan]',
  standalone: true,
  imports: [CommonModule],
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

  // All services needed to access the proper end points
  constructor(
    private bookCopyService: BookCopyService,
    private userService: UserService,
  ) { }

  // Get all the foreign keys necessary to construct all the loan information
  ngOnInit(): void {
    if (this.loan) {
      this.getBookCopyById(this.loan.bookCopyId);
      this.getUserById(this.loan.userId);
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
}
