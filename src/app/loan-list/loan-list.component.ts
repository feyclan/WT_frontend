import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanDto } from '../../dto/ReadLoanDto';
import { LoanService } from '../loan.service';
import { LoanComponent } from '../loan/loan.component';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { UserReservationComponent } from '../user-reservation/user-reservation.component';
import { ReservationService } from '../reservation.service';
import { DataSharingService } from '../data-sharing.service';
import { ReservationComponent } from '../reservation/reservation.component';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [LoanComponent, UserReservationComponent, ReservationComponent, CommonModule],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent {
  @Input() user: ReadUserDto | null = null;
  userId: number | 0 = 0;
  role: string | null = null;
  loans = new Array<LoanDto>();
  reservations = new Array<ReservationDto>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loanService: LoanService,
    private reservationService: ReservationService,
    private dataSharingService: DataSharingService
  ) {
    // Get user id from the url
    this.userId = this.activatedRoute.snapshot.params['id'];

    if (this.userId) {
      this.getUser(this.userId);
      this.getReservationsById(this.userId);
      this.getLoansById(this.userId);
    } else {
      this.getUserReservations();
      this.getUserLoans();
    }
  }

  ngOnInit(): void {
    // Get the role of the current user
    this.dataSharingService.userChangeObservable.subscribe(() => {
      this.role = localStorage.getItem('WT_ROLE');
    })
  }

  getUserLoans() {
    this.loanService.getUserLoans().subscribe(resp => {
      this.loans = resp.data;
    })
  }

  getUserReservations() {
    this.reservationService.getUserReservations().subscribe(resp => {
      this.reservations = resp.data;
    })
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe(resp => {
      this.user = resp.data;
    })
  }

  getLoansById(id: number) {
    this.loanService.getLoansByUserId(id).subscribe(resp => {
      this.loans = resp.data;
    })
  }

  getReservationsById(id: number) {
    this.reservationService.getReservationsByUserId(id).subscribe(resp => {
      this.reservations = resp.data;
    })
  }
}
