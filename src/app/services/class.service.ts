import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private baseUrl = 'http://localhost:3000/api/classes';

  constructor(private http: HttpClient) {}

  getMyClasses(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    //console.log(token);
    return this.http.get(`${this.baseUrl}/my-classes`, { headers });
  }
  

  createClass(className: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/create-class`, { className }, { headers });
  }

  getClassDetails(classId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/class-details/${classId}`, { headers });
  }

  joinClass(classLink: string, password: string, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.baseUrl}/join-class`, { classLink, password }, { headers });
  }

  getClassRole(classId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/class-role/${classId}`, { headers });
  }

  promoteToCoTeacher(classId: string, userIdToPromote: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(classId);
    return this.http.post(`${this.baseUrl}/promote-to-co-teacher`, { classId, userIdToPromote }, { headers });
  }
  

}
