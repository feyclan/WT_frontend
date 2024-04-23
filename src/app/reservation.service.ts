import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dto/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getReservations(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>("http://localhost:8080/reservation/all");
  }

  addReservation(reservation: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>("http://localhost:8080/reservation/create", reservation);
  }

  updateReservation(reservation: any): Observable<ResponseDto> {
    return this.http.put<ResponseDto>("http://localhost:8080/reservation/update", reservation);
  }
}
