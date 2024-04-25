import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanComponent } from '../loan/loan.component';
import { ReservationComponent } from '../reservation/reservation.component';
import { LoanListComponent } from '../loan-list/loan-list.component';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, LoanComponent, ReservationComponent, LoanListComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  // Get the user by reading the param from the url
  constructor() {}
}
