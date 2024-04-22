import { Component } from '@angular/core';
import { DataSharingService } from '../data-sharing.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  role: string | null = null;
  name: string | null = null;

  constructor(private dataSharingService: DataSharingService) {

  }

  ngOnInit() {
    this.dataSharingService.userChangeObservable.subscribe(() => {
      console.log('NAVBAR: User has changed');

      this.role = localStorage.getItem('WT_ROLE');
      this.name = localStorage.getItem('WT_NAME');
    })
  }

}
