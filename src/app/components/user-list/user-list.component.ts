import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { ReadUserDto } from '../../../dto/ReadUserDto';
import { UserService } from '../../services/user.service';
import { RegistrationComponent } from '../registration/registration.component';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserComponent, RegistrationComponent,CommonModule,SearchBarComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})

export class UserListComponent {
  users = new Array<ReadUserDto>();
  totalPages : number = 0;
  currentPage: number = 1;
  totalPagesArray: number[] = [];
  searchTerm: String = "";
  searchPlaceholder: string = "Zoek op naam";

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(1);
  }

  loadUsers(pageNr: number) {
    let dto = {
      fullName: this.searchTerm,
      pageNr: pageNr - 1
    };
    this.userService.searchUser(dto).subscribe((response) => {
      this.users = response.data.users;
      this.totalPages = response.data.totalPages;
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.currentPage = pageNr;
    });
  }

  setPage(page: number){
    if(page < 1 || page > this.totalPages){
      return;
    }

    this.currentPage = page;
    this.loadUsers(page);
  }

  hasCreatePermission() {
    let role = localStorage.getItem('WT_ROLE');

    return !!role && role == 'TRAINER';
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.loadUsers(1);
  }

}
