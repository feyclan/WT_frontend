import { Component } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-data-share-standalone',
  standalone: true,
  imports: [],
  templateUrl: './data-share-standalone.component.html',
  styleUrl: './data-share-standalone.component.scss'
})
export class DataShareStandaloneComponent {

  number = 0; 

  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.dataShareExampleObservable.subscribe(n => {
      console.log('Data share heeft ontvangen:' + n);
      this.number = n;
    });
  }

}
