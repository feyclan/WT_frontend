import { Component, Input } from '@angular/core';
import { ReservationDto } from '../../dto/ReadReservationDto';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: '[app-reservation]',
  standalone: true,
  imports: [],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.scss'
})
export class ReservationComponent {
  @Input() reservation: ReservationDto | null = null;
  book: ReadBookDto | null = null;
  user: ReadUserDto | null = null;

  constructor(private bookService: BookService, private userService: UserService) {}

  ngOnInit(): void {
    if (this.reservation) {
      this.getBookById(this.reservation.bookId);
      this.getUserById(this.reservation.userId);
    }
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


}
