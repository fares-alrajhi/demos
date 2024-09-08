import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatError} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {MatSelectModule } from '@angular/material/select';
import { UserService } from '../../user/user.service';
import { tap } from 'rxjs';



@Component({
  selector: 'login',
  standalone: true,
  imports: [
    CommonModule,
    MatCard, 
    MatInputModule,
    MatCardModule,
    MatFormField,
    MatFormFieldModule,
    MatError,
    RouterModule,
    MatCard, 
    MatCardModule,
    MatFormField, 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent{

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(private userService: UserService,private router: Router) {
    
  }

  login() {
    if (this.form.valid) {
      this.userService.login({
        email: this.email.value,
        password: this.password.value
      }).pipe(
        tap(() => this.router.navigate(['/home']))
      ).subscribe();
    }
  }


  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  @HostListener('window:beforeunload', ['$event'])
  checkBeforeLoad() {
    if (this.userService.isAuthenticated()) { this.router.navigate(['/home']) }

  }

}