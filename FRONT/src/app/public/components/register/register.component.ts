import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

import { CustomValidators } from '../../validators/custom-validators';
import { UserService } from '../../services/user.service';
import { UserModel, UserRegisterDto } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatHint,
    MatError,
    MatButton,
    RouterLink,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fcEmail: FormControl = new FormControl<null | string>(null, [Validators.required, Validators.email]);
  fcUsername: FormControl = new FormControl<null | string>(null, [Validators.required]);
  fcPassword: FormControl = new FormControl<null | string>(null, [Validators.required]);
  fcPasswordConfirm: FormControl = new FormControl<null | string>(null, [Validators.required]);

  form: FormGroup = new FormGroup(
    {
      email: this.fcEmail,
      username: this.fcUsername,
      password: this.fcPassword,
      passwordConfirm: this.fcPasswordConfirm,
    },
    { validators: CustomValidators.passwordMatching },
  );

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  register() {
    if (this.form.valid) {
      const registerDto = {
        email: this.fcEmail.value,
        username: this.fcUsername.value,
        password: this.fcPassword.value,
      } as UserRegisterDto;
      this.userService.register(registerDto).subscribe({
        next: (result: UserModel) => this.router.navigate(['public/login']),
        error: error => console.log(error),
      })
    }
  }
}

