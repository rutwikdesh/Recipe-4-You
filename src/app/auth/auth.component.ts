import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLogin: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  onModeSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      complete: () => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
      },
      error: (e) => {
        this.error = this.authService.getError(e.error.error.message);
        this.isLoading = false;
      },
    });

    form.reset();
  }
}
