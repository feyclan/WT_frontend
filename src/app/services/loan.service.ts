import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../dto/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getLoans(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>("http://localhost:8080/loan/all")
  }

  getUserLoans(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>("http://localhost:8080/loan/user/all")
  }

  getLoansByUserId(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>("http://localhost:8080/loan/user/" + id)
  }

  getLoan(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>("http://localhost:8080/loan/" + id);
  }

  createLoan(loan: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>("http://localhost:8080/loan/create", loan);
  }

  updateLoan(loan: any): Observable<ResponseDto> {
    return this.http.put<ResponseDto>("http://localhost:8080/loan/update", loan);
  }

  deleteLoan(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>("http://localhost:8080/loan/delete/" + id);
  }

  searchLoan(searchTerm: string): Observable<ResponseDto> {
    return this.http.post<ResponseDto>("http://localhost:8080/loan/search", searchTerm);
  }
}
