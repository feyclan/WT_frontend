import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadBookDto } from '../dto/ReadBookDto';
import { ResponseDto } from '../dto/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  getBooks(pageNr: number): Observable<ResponseDto> {
    return this.http.post<ResponseDto>("http://localhost:8080/book/all", pageNr);
  }

  getBook(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>("http://localhost:8080/book/" + id);
  }

  addBook(book: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/book/create", book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/books/delete/" + id);
  }

}
