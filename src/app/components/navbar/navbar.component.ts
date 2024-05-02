import { Component } from '@angular/core';
import { DataSharingService } from "../../services/data-sharing.service";
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from "../../services/user.service";
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

  constructor(private dataSharingService: DataSharingService, private userService: UserService, private router : Router) {

  }

  ngOnInit() {
    this.dataSharingService.userChangeObservable.subscribe(() => {
      console.log('NAVBAR: User has changed');

      this.role = localStorage.getItem('WT_ROLE');
      this.name = localStorage.getItem('WT_NAME');
    })
  }

  logout() {    
    this.userService.logout().subscribe((response) =>{
      localStorage.clear();
      this.dataSharingService.updateUser();
      this.router.navigate(["/login"]);
    });
  }

}
