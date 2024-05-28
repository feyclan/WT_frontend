import { Component } from '@angular/core';
import { DataShareChildComponent } from '../data-share-child/data-share-child.component';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-data-share-parent',
  standalone: true,
  imports: [DataShareChildComponent],
  templateUrl: './data-share-parent.component.html',
  styleUrl: './data-share-parent.component.scss'
})
export class DataShareParentComponent {

  number = 0;
  name = 'Martijn';

  constructor(private dataSharingService: DataSharingService) {
  }

  changeName() {
    this.name = 'Test';
  }

  showNumber(e: number) {
    console.log(e);
    this.number = e;

    this.dataSharingService.dataShare(this.number);
  }

}
