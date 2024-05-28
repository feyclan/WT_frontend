import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  // De components die een actie starten die melden zich 
  // aan voor de BehaviorSubject
  userChange = new BehaviorSubject(null);
  dataShareExample = new BehaviorSubject<number>(0);

  // De observable is waar de ontvangende components zich 
  // voor aanmelden
  userChangeObservable = this.userChange.asObservable();
  dataShareExampleObservable = this.dataShareExample.asObservable();

  // Deze wordt aangeroepen door de login pagina
  updateUser() {
    this.userChange.next(null);
  }

  // Parent component roept deze function aan
  dataShare(n: number) {
    // Hier roepen we de BehaviorSubject aan. Dan worden alle
    // components die zich hier voor hebben aangemeld krijgen de 
    // waarde n mee.
    this.dataShareExample.next(n);
  }

}
