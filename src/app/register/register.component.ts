import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    email: '',
    password: '',
    fullName: '', // Add more fields as required
  };

  constructor(private authService: AuthService) {}

  register(): void {
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Redirect to login or another page
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }
}
