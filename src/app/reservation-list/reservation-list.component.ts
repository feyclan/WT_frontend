import { Component } from '@angular/core';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent {

  reservations = new Array<ReservationDto>();

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((response) => {
      this.reservations = response.data;
    })
  }
}
