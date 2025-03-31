import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { UserService } from '../../services/user.service';
import { UserLoginDto } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fcEmail: FormControl = new FormControl<null | string>(null, [Validators.required, Validators.email]);
  fcPassword: FormControl = new FormControl<null | string>(null, [Validators.required]);

  form: FormGroup = new FormGroup(
    {
      email: this.fcEmail,
      password: this.fcPassword,
    }
  );

  constructor(private userService: UserService, private router: Router) {}

  login(): void {
    if (this.form.valid) {
      const loginDto = {
        email: this.fcEmail.value,
        password: this.fcPassword.value,
      } as UserLoginDto;
      this.userService.login(loginDto).pipe(
        tap(() => this.router.navigate(['private/dashboard']))
      ).subscribe();
    }
  }
}
