import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ClassService } from '../services/class.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  classDetails: any = null;
  isTeacher: boolean = false;
  userRole: string = '';
  classId: string | null = null;

  constructor(
    private route: ActivatedRoute, private classService: ClassService, private authService: AuthService
  ) {}

  ngOnInit() {
    this.getClassDetails();
    this.classId = this.route.snapshot.paramMap.get('classId');
  }

  getClassDetails() {
    const token = this.authService.getToken();
    const classId = this.route.snapshot.paramMap.get('classId');
    
    if (classId) {
      if (token !== null) {
      this.classService.getClassDetails(classId,token).subscribe(
        (response: any) => {
          //console.log(response);
          this.classDetails = response;
          this.getClassRole(classId, token);
        },
        (error) => {
          console.error('Error fetching class details:', error);
        }
      );
    }}
  }

  getClassRole(classId: string, token: string) {
    if (token) {
      this.classService.getClassRole(classId, token).subscribe(
        (response: any) => {
          this.userRole = response.role;
          this.isTeacher = this.userRole === 'teacher' || this.userRole === 'co-teacher' ;
          //console.log(this.isTeacher);
        },
        (error) => {
          console.error('Error fetching user role for class:', error);
        }
      );
    }
  }

  promoteToCoTeacher(userIdToPromote: string,classId: string) {
    const token = this.authService.getToken();
    if (token) {
    this.classService.promoteToCoTeacher(classId, userIdToPromote,token).subscribe(
      response => {
        console.log(response.message);
      },
      error => {
        console.error('Error promoting to co-teacher:', error);
      }
    );
  }}
}
