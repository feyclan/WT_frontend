import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanDto } from '../../dto/ReadLoanDto';
import { LoanService } from '../loan.service';
import { LoanComponent } from '../loan/loan.component';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [LoanComponent, CommonModule],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.scss'
})
export class LoanListComponent {
  loans = new Array<LoanDto>();

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() {
    this.loanService.getUserLoans().subscribe(resp => {
      this.loans = resp.data;
    })
  }
}
