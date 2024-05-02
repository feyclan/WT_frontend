import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseDto } from "../../dto/ResponseDto";

@Injectable({
    providedIn: 'root'
})
export class BookCopyService {

    constructor(private http: HttpClient) {};

    // TODO: change to post requests when backend is finished
    // getBooks(pageNr: number): Observable<ResponseDto> {
    //     return this.http.get<ResponseDto>("http://localhost:8080/bookcopy/all," pageNr)
    // }

    getBookCopies(): Observable<ResponseDto> {
        return this.http.get<ResponseDto>("http://localhost:8080/bookcopy/all")
    }

    getBookCopy(id: number): Observable<ResponseDto> {
        return this.http.get<ResponseDto>("http://localhost:8080/bookcopy/all/" + id);
    }

    createBookCopy(bookCopy: any): Observable<ResponseDto> {
        return this.http.post<ResponseDto>("http://localhost:8080/bookcopy/create", bookCopy);
    }

    updateBookCopy(bookCopy: any): Observable<ResponseDto> {
        return this.http.put<ResponseDto>("http://localhost:8080/bookcopy/update", bookCopy);
    }

    deleteBookCopy(id: number): Observable<ResponseDto> {
        return this.http.delete<ResponseDto>("http://localhost:8080/bookcopy/delete/" + id);
    }
}