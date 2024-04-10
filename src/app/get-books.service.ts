import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetBooksService {

  constructor(private http: HttpClient) {}

  getBooks(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/book/all");
  }
}
