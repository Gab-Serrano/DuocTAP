import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserDetails } from '../models/models';
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/profile';
  private apiUrl2 = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  getUserDetails(): Observable<UserDetails> {
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('currentUserToken');
    return this.http.get<UserDetails[]>(`${this.apiUrl}?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(map(profiles => profiles[0]));
  }

  getUserCredentials(): Observable<any> {
    const userId = localStorage.getItem('currentUserId');
    const token = localStorage.getItem('currentUserToken');
    return this.http.get<any[]>(`${this.apiUrl2}?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(map(users => users[0]));
  }
}
