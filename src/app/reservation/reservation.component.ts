import { Component, Input } from '@angular/core';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { BookService } from '../book.service';
import { UserService } from '../user.service';
import { LoanService } from '../loan.service';
import { ReservationService } from '../reservation.service';
import { BookCopyService } from '../bookCopy.service';
import { ReadBookCopyDto } from '../../dto/ReadBookCopyDto';
import { CommonModule } from '@angular/common';
import { DataSharingService } from '../data-sharing.service';
import { Router } from '@angular/router';

@Component({
  selector: '[app-reservation]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  @Input() reservation: ReservationDto | null = null;
  @Input() isUserList = false;
  book: ReadBookDto | null = null;
  user: ReadUserDto | null = null;
  role: string | null = null;
  route: string | null = null;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private loanService: LoanService,
    private bookCopyService: BookCopyService,
    private reservationService: ReservationService,
    private dataSharingService: DataSharingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.reservation) {
      this.getBookById(this.reservation.bookId);
      this.getUserById(this.reservation.userId);
    }

    // Get the role of the current user
    this.dataSharingService.userChangeObservable.subscribe(() => {
      this.role = localStorage.getItem('WT_ROLE');
    });

    this.route = this.router.url;
  }

  getBookById(id: number) {
    this.bookService.getBook(id).subscribe(response => {
      this.book = response.data;
    });
  }

  getUserById(id: number) {
    this.userService.getUser(id).subscribe(response => {
      this.user = response.data;
    });
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }

  acceptReservation() {
    if (this.reservation && this.book && this.user) {

      // get bookcopy data for the specific book
      this.bookCopyService.getBookCopy(this.book.id).subscribe(bookCopyResponse => {
        const bookCopyData: ReadBookCopyDto[] = bookCopyResponse.data;

        // check if bookCopy is available and find first available bookCopy
        const availableBookCopy = bookCopyData.find(copy => copy.available);

        if (availableBookCopy) {
          // create loan
          const loanData = {
            conditionStart: availableBookCopy.state,
            startDate: new Date(),
            bookCopyId: availableBookCopy.id,
            isActive: true,
            userId: this.user?.id,
            bookId: this.book?.id
          };

          this.loanService.createLoan(loanData).subscribe(response => {
            if (response.success) {
              console.log('response', response);
              alert("Lening aangemaakt")
            } else {
              alert(response.errors)
            }
          });

          // change reservationRequest status
          if (this.reservation?.reservationRequest == "PENDING") {
            this.reservation.reservationRequest = "ACCEPTED"
            this.reservationService.updateReservation(this.reservation).subscribe(response => {
              if (response.success) {
                console.log('response', response);
              } else {
                alert(response.errors);
              }
            });
          }
        } else {
          alert("Geen boek kopieën beschikbaar")
        }
      })
    }
  }

  denyReservation() {
    if (this.reservation) {
      if (this.reservation?.reservationRequest == "PENDING") {
        this.reservation.reservationRequest = "DENIED"
        this.reservationService.updateReservation(this.reservation).subscribe(response => {
          if (response.success) {
            console.log('response', response);
            alert("Aanvraag afgewezen")
          } else {
            alert(response.errors)
          }
        });
      }
    }
  }
}