import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dto/ResponseDto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  searchKeyword(searchDto: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>("http://localhost:8080/author/search", searchDto);
  }

}
