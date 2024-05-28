import { Component, Input } from '@angular/core';
import { ReadBookCopyDto } from '../../../dto/ReadBookCopyDto';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReadUserDto } from '../../../dto/ReadUserDto';
import { UserListComponent } from '../user-list/user-list.component'
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms'
import { DataSharingService } from "../../services/data-sharing.service";
import { LoanService } from "../../services/loan.service";
import { Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select'

@Component({
  selector: '[app-book-copy-details]',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, UserListComponent, NgSelectModule],
  templateUrl: './book-copy-details.component.html',
  styleUrl: './book-copy-details.component.scss'
})

export class BookCopyDetailsComponent {
  users = new Array<ReadUserDto>();
  @Input() bookCopy: ReadBookCopyDto | null = null;
  role: string | null = null;
  route: string | null = null;
  bookId: number | null = null;
  selectedUser: ReadUserDto | null = null;
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private loanService: LoanService,
    private dataSharingService: DataSharingService,
    private router: Router,
    private bookRoute: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.getAllUsers()

    this.dataSharingService.userChangeObservable.subscribe(() => {
      this.role = localStorage.getItem('WT_ROLE');
    });

    this.route = this.router.url;
    this.bookId = Number(this.bookRoute.snapshot.paramMap.get('id'))
  }

  getAllUsers() {
    this.userService.getUsers(0).subscribe(response => {
      this.users = response.data.users
    })
  }

  makeReservation() {
    if (this.bookCopy !== null && this.bookCopy.available && this.userId !== null) {
      this.userId = Number(this.userId)
      console.log(this.userId)
      console.log(this.bookCopy)
      console.log(this.bookId)
      const loanData = {
        conditionStart: this.bookCopy.state,
        startDate: new Date(),
        bookCopyId: this.bookCopy.id,
        isActive: true,
        userId: this.userId,
        bookId: this.bookId      
      }

      this.loanService.createLoan(loanData).subscribe(response => {
        if (response.success) {
          console.log('response', response)
          alert("Lening aangemaakt")
        } else {
          alert(response.errors)
        }
      })
    }
    

  }

}
