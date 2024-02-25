// join-class.component.ts
import { Component } from '@angular/core';
import { ClassService } from '../services/class.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.component.html',
  styleUrls: ['./join-class.component.css']
})
export class JoinClassComponent {
  classLink: string = '';
  classPassword: string = '';
  errorMessage: string = '';

  constructor(private classService: ClassService, private authService: AuthService, private router: Router) {}

  joinClass() {
    const token = this.authService.getToken();
    if (token) {
      this.classService.joinClass(this.classLink, this.classPassword, token).subscribe(
        response => {
          //console.log(response.message);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error joining class:', error);
          this.errorMessage = error.error.message || 'Error joining class';
        }
      );
    } else {
      this.errorMessage = 'You must be logged in to join a class.';
    }
  }
}
