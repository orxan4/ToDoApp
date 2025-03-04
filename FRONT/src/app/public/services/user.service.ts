import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import {
  UserLoginDto,
  UserModel,
  UserRegisterDto,
} from '../interfaces/user.interfaces';
import { LoginResponseModel } from '../interfaces/public.interface';

export const snackBarConfig: MatSnackBarConfig = {
  duration: 2000,
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  login(user: UserLoginDto): Observable<LoginResponseModel> {
    const url = 'api/users/login';
    return this.httpClient.post<LoginResponseModel>(url, user).pipe(
      tap((response: LoginResponseModel) => localStorage.setItem('access', response.access_token)),
      tap(() => this.snackBar.open('Login Successfully', 'Close', snackBarConfig)),
      catchError((err: any) => {
        this.snackBar.open(`${err.error.message}`, 'Close', snackBarConfig);
        return throwError(() => err);
      }),
    );
  }

  register(user: UserRegisterDto) {
    const url = 'api/users/register';
    return this.httpClient.post<UserModel>(url, user).pipe(
      tap((createdUser: UserModel) => {
        this.snackBar.open(
          `User ${createdUser.username} was created`,
          'Close',
          snackBarConfig,
        )
      }),
      catchError((err: any) => {
        this.snackBar.open(
          `User could not be created because: ${err.error.message}`,
          'Close',
          snackBarConfig,
        );
        return throwError(() => err);
      }),
    );
  }
}
