import { Component, Input } from '@angular/core';
import { ReservationDto } from '../../dto/ReadReservationDto';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  @Input() reservation: ReservationDto | null = null;

}
