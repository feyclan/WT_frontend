import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-data-share-child',
  standalone: true,
  imports: [],
  templateUrl: './data-share-child.component.html',
  styleUrl: './data-share-child.component.scss'
})
export class DataShareChildComponent {

  @Input("argName") argName: string = '';

  onClick = output<number>();

  btnClick() {
    this.onClick.emit(12);
  }

}
