import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadUserDto } from '../dto/ReadUserDto';
import { ResponseDto } from '../dto/ResponseDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>("http://localhost:8080/user/all");
  }

  getUser(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>("http://localhost:8080/user/" + id);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>("http://localhost:8080/user/create", user);
  }

}
