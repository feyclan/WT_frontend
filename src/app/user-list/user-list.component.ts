import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { ReadUserDto } from '../../dto/ReadUserDto';
import { UserService } from '../user.service';
import { RegistrationComponent } from '../registration/registration.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserComponent, RegistrationComponent,CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  users = new Array<ReadUserDto>();
  totalPages : number = 0;
  currentPage: number = 1;
  totalPagesArray: number[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(1);
  }

  loadUsers(pageNr: number) {
    this.userService.getUsers(pageNr-1).subscribe((response) => {
      this.users = response.data.users;
      this.totalPages = response.data.totalPages;
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      console.log(this.users);
      console.log("totalPages = " + this.totalPages)
    });
  }

  setPage(page: number){
    if(page < 1 || page > this.totalPages){
      return;
    }

    this.currentPage = page;
    this.loadUsers(page);
  }

}
