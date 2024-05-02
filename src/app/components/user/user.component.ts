import { Component, Input } from '@angular/core';
import { ReadUserDto } from '../../../dto/ReadUserDto';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @Input() user: ReadUserDto | null = null;

}
