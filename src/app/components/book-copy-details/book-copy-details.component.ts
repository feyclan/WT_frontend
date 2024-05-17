import { Component, Input } from '@angular/core';
import { ReadBookCopyDto } from '../../../dto/ReadBookCopyDto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReadUserDto } from '../../../dto/ReadUserDto';
import { UserListComponent } from '../user-list/user-list.component'
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms'

@Component({
  selector: '[app-book-copy-details]',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, UserListComponent],
  templateUrl: './book-copy-details.component.html',
  styleUrl: './book-copy-details.component.scss'
})

export class BookCopyDetailsComponent {
  users = new Array<ReadUserDto>();
  @Input() bookCopy: ReadBookCopyDto | null = null;
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getUsers(0).subscribe(response => {
      this.users = response.data.users
    })
  }

  

}
