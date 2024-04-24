import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanDto } from '../../dto/ReadLoanDto';
import { LoanService } from '../loan.service';
import { LoanComponent } from '../loan/loan.component';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { UserReservationComponent } from '../user-reservation/user-reservation.component';
import { ReservationService } from '../reservation.service';
import { DataSharingService } from '../data-sharing.service';
import { ReservationComponent } from '../reservation/reservation.component';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [LoanComponent, UserReservationComponent, ReservationComponent, CommonModule],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent {
  role: string | null = null;
  loans = new Array<LoanDto>();
  reservations = new Array<ReservationDto>();

  constructor(
    private loanService: LoanService,
    private reservationService: ReservationService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    this.loadUserLoans();
    this.loadUserReservations();

    // Get the role of the current user
    this.dataSharingService.userChangeObservable.subscribe(() => {
      this.role = localStorage.getItem('WT_ROLE');
    })
  }

  loadUserLoans() {
    this.loanService.getUserLoans().subscribe(resp => {
      this.loans = resp.data;
    })
  }

  loadUserReservations() {
    this.reservationService.getUserReservations().subscribe(resp => {
      this.reservations = resp.data;
    })
  }
}
