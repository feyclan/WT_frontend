import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { LoginRequestDto } from '../../dto/LoginRequestDto';
import { Router } from '@angular/router';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group(
    {
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  constructor(private formBuilder: FormBuilder, private dataSharingService: DataSharingService, private userService: UserService, private router: Router) {

  }

  login() {
    let dto = new LoginRequestDto();
    dto.email = this.loginForm.controls['username'].value;
    dto.password = this.loginForm.controls['password'].value;

    localStorage.clear();

    this.userService.login(dto).subscribe(responseDto => {
      if (responseDto.success) {
        localStorage.setItem('WT_NAME', responseDto.data.name);
        localStorage.setItem('WT_TOKEN', responseDto.data.token);
        localStorage.setItem('WT_ROLE', responseDto.data.role);

        // Zeg tegen de data sharing service dat de user is veranderd
        this.dataSharingService.updateUser();

        this.router.navigateByUrl('catalogue');
      } else {
        alert('Onjuist gegevens');
      }

    })
  }

}
