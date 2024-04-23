import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanDto } from '../../dto/ReadLoanDto';
import { LoanService } from '../loan.service';
import { LoanComponent } from '../loan/loan.component';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { UserReservationComponent } from '../user-reservation/user-reservation.component';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [LoanComponent, UserReservationComponent, CommonModule],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent {
  loans = new Array<LoanDto>();
  userReservations = new Array<ReservationDto>();

  constructor(
    private loanService: LoanService,
    private reservationService: ReservationService,
  ) { }

  ngOnInit(): void {
    this.loadLoans();
    this.loadUserReservations();
  }

  loadLoans() {
    this.loanService.getUserLoans().subscribe(resp => {
      this.loans = resp.data;
    })
  }

  loadUserReservations() {
    this.reservationService.getUserReservations().subscribe(resp => {
      this.userReservations = resp.data;
    })
  }
}
