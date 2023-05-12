import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private authService: AuthService) {}
  isLogin = true;
  isLoading = false;

  onModeSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLogin) {
    } else {
      this.authService.signUp(email, password).subscribe({
        error: (e) => console.log(e),
      });
    }
    this.isLoading = false;
    form.reset();
  }
}
