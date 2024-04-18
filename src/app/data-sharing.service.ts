import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  userChange = new BehaviorSubject(null);

  // Deze observable die gebruikt de navbar om te luisteren naar veranderingen
  userChangeObservable = this.userChange.asObservable();

  // Deze wordt aangeroepen door de login pagina
  updateUser() {
    this.userChange.next(null);
  }
}
