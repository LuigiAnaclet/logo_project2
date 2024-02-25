import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  fullName: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (!this.email || !this.password || !this.fullName) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.authService.register(this.email, this.password, this.fullName)
      .subscribe(success => {
        if (success) {
          this.authService.saveToken(success.accessToken);
          this.router.navigate(['/']);
        }
      }, err => {
        this.errorMessage = err.error.message || 'Registration failed.';
      });
  }
}
