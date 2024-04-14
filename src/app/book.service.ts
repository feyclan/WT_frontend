import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadBookDto } from '../dto/ReadBookDto';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  getBooks(): Observable<ReadBookDto[]> {
    return this.http.get<ReadBookDto[]>("http://localhost:8080/book/all");
  }

  getBook(id: number): Observable<any> {
    return this.http.get<any>("http://localhost:8080/book/" + id);
  }

  addBook(book: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/book/create", book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete<any>("http://localhost:8080/books/delete/" + id);
  }

}
