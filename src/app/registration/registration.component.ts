import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  onSave = output<void>();

  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    role: new FormControl(''),
  });

  submitted: boolean = false;
  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  get firstName() {
    return this.registrationForm.controls['firstName'];
  }
  get lastName() {
    return this.registrationForm.controls['lastName'];
  }
  get email() {
    return this.registrationForm.controls['email'];
  }
  get password() {
    return this.registrationForm.controls['password']
  }
  get confirmPassword() {
    return this.registrationForm.controls['confirmPassword'];
  }
  get role() {
    return this.registrationForm.controls['role'];
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
    },
    {
      validators: this.passwordMatchValidator
    })
  }

  onSubmit() {
    let dto = {
      firstName: this.registrationForm.value.firstName,
      lastName: this.registrationForm.value.lastName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      role: this.registrationForm.value.role
    }
    this.userService.addUser(dto).subscribe(() => {
      alert("User is aangemaakt");
      console.log(dto);
      this.registrationForm.reset();
      this.onSave.emit();

    })

  }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value ===
      control.get('confirmPassword')?.value
      ? null
      : {mismatch: true};
  }
}
