import { Component, OnInit } from '@angular/core';
import { ClassService } from '../services/class.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  classes: any[] = [];
  token: string ="";

  constructor(private classService: ClassService,private authService: AuthService) {}

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    const token = this.authService.getToken();
    if (token !== null) {
      //console.log(token);
      this.classService.getMyClasses(token).subscribe(
        data => {
          //console.log(data);
          this.classes = data.classes;
        },
        error => {
          console.error('Error fetching classes', error);
        }
      );
    } else {
      console.error('No token found, user might not be logged in');
    }
  }
}
