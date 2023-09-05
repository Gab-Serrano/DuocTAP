import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private router: Router) { }

  // Método mock para "iniciar sesión"
  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map(users => {
        if (users && users.length) {
          // Guarda el token en el local storage o donde prefieras.
          localStorage.setItem('currentUserToken', users[0].token);
          // Guarda el id del usuario en el local storage o donde prefieras.
          localStorage.setItem('currentUserId', users[0].userId.toString());
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout(): void {
    // Elimina el token del local storage.
    localStorage.removeItem('currentUserToken');
    localStorage.removeItem('currentUserId');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUserToken');
  }

  getCurrentUserToken(): string | null {
    return localStorage.getItem('currentUserToken');
  }
}
