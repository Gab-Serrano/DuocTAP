import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn = false;

  constructor() { }

  // Método mock para "iniciar sesión"
  login() {
    this.isLoggedIn = true;
  }

  // Método mock para "cerrar sesión"
  logout() {
    this.isLoggedIn = false;
  }
}
