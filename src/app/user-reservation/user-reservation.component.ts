import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { ReservationService } from '../reservation.service';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { BookService } from '../book.service';

@Component({
  selector: '[app-user-reservation]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-reservation.component.html',
  styleUrl: './user-reservation.component.scss'
})
export class UserReservationComponent {
  // Every DTO needed to construct the proper information from the root- and foreign tables
  @Input() reservation: ReservationDto | null = null;
  book: ReadBookDto | null = null;

  // All services needed to access the proper end points
  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    if (this.reservation) {
      this.getBookById(this.reservation.bookId);
    }
  }

  getBookById(id: any) {
    this.bookService.getBook(id).subscribe(resp => {
      this.book = resp.data;
    })
  }

}
