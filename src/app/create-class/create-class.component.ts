import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent {
  className: string = '';
  classLink: string = '';
  classPassword: string = '';
  classCreated: boolean = false;

  constructor(private http: HttpClient) {}

  createClass() {
    // Call the /create-class endpoint with the class name
    this.http.post('/api/create-class', { className: this.className })
      .subscribe(
        (response: any) => {
          // Set the link and password from the response
          this.classLink = response.link;
          this.classPassword = response.password;
          this.classCreated = true;
        },
        (error) => {
          console.error('Error creating class:', error);
        }
      );
  }
}
