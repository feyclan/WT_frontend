import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { UserService } from '../user.service';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserComponent, RegistrationComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  users = new Array<ReadUserDto>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((response) => {
      this.users = response.data;
      console.log(this.users)
    });
  }

}
