import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../../user/user.service';
import { Store } from '@ngrx/store';
import { Register } from 'libs/customer/store/actions/user.actions';



@Component({
  selector: 'register',
  standalone: true,
  imports: [
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    name: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
  }, {
    validators: CustomValidators.passwordsMatching
  })

  constructor(private store: Store) {}

  register() {
    if (this.form.valid) {
      this.store.dispatch(Register({name: this.name.value, email: this.email.value, password: this.password.value}));

    }
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
  }
}
