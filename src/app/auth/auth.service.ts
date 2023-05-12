import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  token: string = null;
  private tokenExpTimer: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  private handleUserAuth(
    email: string,
    id: string,
    token: string,
    expiresIn: string
  ) {
    const tokenExpiresIn = new Date(new Date().getTime() + +expiresIn * 10000);
    const user = new User(email, id, token, tokenExpiresIn);
    this.user.next(user);
    this.autoLogout(+expiresIn * 1000);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB8B82huFFxaLH0HPL54yjhSbwZ9TvBd-0',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleUserAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
          this.token = resData.idToken;
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB8B82huFFxaLH0HPL54yjhSbwZ9TvBd-0',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleUserAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
          this.token = resData.idToken;
        })
      );
  }

  logOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userInfo');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }

  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.logOut();
    }, expDuration);
  }

  autoLogin() {
    const userinfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userinfo) {
      return;
    }
    const loadedUser = new User(
      userinfo.email,
      userinfo.id,
      userinfo._token,
      new Date(userinfo._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expDuration =
        new Date(userinfo._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.token = loadedUser.token;
      this.autoLogout(expDuration);
    }
  }

  getError(e: string) {
    let error: string;
    switch (e) {
      case 'EMAIL_EXISTS':
        error = 'This email already exists';
        break;
      case 'OPERATION_NOT_ALLOWED':
        error = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'This email is not registered.';
        break;
      case 'INVALID_PASSWORD':
        error = 'Invalid Password. Please try again.';
        break;
      case 'USER_DISABLED':
        error = 'The user account has been disabled by an administrator.';
        break;
    }
    return error;
  }
}
