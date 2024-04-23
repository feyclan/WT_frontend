import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { LoanService } from '../loan.service';
import { ReservationService } from '../reservation.service';
import { LoanComponent } from '../loan/loan.component';
import { UserReservationComponent } from '../user-reservation/user-reservation.component';
import { LoanDto } from '../../dto/ReadLoanDto';
import { ReservationDto } from '../../dto/ReadReservationDto';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, LoanComponent, UserReservationComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  @Input() user: ReadUserDto | null = null;
  userId: number | 0 = 0;
  loans = new Array<LoanDto>();
  userReservations = new Array<ReservationDto>();

  // Get the user by reading the param from the url
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loanService: LoanService,
    private reservationService: ReservationService
  ) {
    this.userId = this.activatedRoute.snapshot.params['id'];

    this.getUser(this.userId);
    this.getReservations();
    this.getLoans(this.userId);
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe(resp => {
      this.user = resp.data;
    })
  }

  // Create endpoint to get user loans by id
  getLoans(id: number) {
  }

  // Create endpoint to get user reservations by id
  getReservations() {
  }
}
