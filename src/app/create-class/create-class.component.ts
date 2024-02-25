// create-class.component.ts
import { Component } from '@angular/core';
import { ClassService } from '../services/class.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent {
  className: string = '';
  classLink: string = '';
  classPassword: string = '';
  message: string = '';

  constructor(
    private classService: ClassService,
    private authService: AuthService, private router: Router
  ) {}

  createClass() {
    const token = this.authService.getToken(); // Get the token from AuthService
    if (!token) {
      console.error('Authentication token not found');
      return;
    }

    this.classService.createClass(this.className, token).subscribe(
      data => {
        console.log('Class created successfully', data);
        this.classLink = data.classDetails.link;
        this.classPassword = data.classDetails.password;
        this.message = data.message;
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error creating class', error);
      }
    );
  }
}
