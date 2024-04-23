import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  @Input() user: ReadUserDto | null = null;
  id: number | 0 = 0;

  // Get the user by reading the param from the url
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.id).subscribe(resp => {
      this.user = resp.data;
    })
  }
}
