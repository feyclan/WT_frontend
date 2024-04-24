import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { ReservationService } from '../reservation.service';
import { ReadBookDto } from '../../dto/ReadBookDto';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  id: number = 0;
  book: ReadBookDto | null = null;
  role: string | null = null;

  // Activated route is de huidige route
  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService, private reservationService: ReservationService,
    private dataSharingService: DataSharingService ) {
    // Hiermee lezen we de :id uit de routing
    this.id = this.activatedRoute.snapshot.params['id'];

    

    this.loadBook();
  }

  ngOnInit() {
    this.dataSharingService.userChangeObservable.subscribe(() => {
          this.role = localStorage.getItem('WT_ROLE');
    })
  }

  loadBook() {
    this.bookService.getBook(this.id).subscribe(response => {
      this.book = response.data;
      console.log(this.book);
    })
  }

  createReservation(): void {
    let reservationDto = {
      reservationRequest: "PENDING",
      requestDate: new Date(),
      bookId: this.id,
    }

    this.reservationService.addReservation(reservationDto).subscribe(response => {
      console.log(reservationDto);
      if (response.success) {
        alert("Je reserverings aanvraag is gemaakt.");
      }
      else {
        alert("Er is iets fout gegaan bij het maken van de reservering: " + response.errors);
        console.log(response);
      }
    })
  }
}
