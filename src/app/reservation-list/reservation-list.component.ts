import { Component } from '@angular/core';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { ReservationService } from '../reservation.service';
import { BookService } from '../book.service';
import { ReservationComponent } from '../reservation/reservation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [ReservationComponent, CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent {

  reservations = new Array<ReservationDto>();

  constructor(private reservationService: ReservationService, private bookService: BookService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationService.getReservations().subscribe((response) => {
      this.reservations = response.data;
    })
  }
}
