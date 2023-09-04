import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    AuthFormComponent,
    CommonModule,
    RouterModule,
  ]
})
export class AuthenticationPage {
  private readonly router = inject(Router);

  readonly url: string = this.router.url.split('/').pop() || 'default';
  pageTitle = 'Iniciar sesión'
  actionButtonText = 'Iniciar sesión';

  ngOnInit() {
    if (this.url === 'signup') {
      this.pageTitle = 'Crear una cuenta';
      this.actionButtonText = 'Crear cuenta';
    }

    if (this.url === 'reset') {
      this.pageTitle = 'Restablecer contraseña';
      this.actionButtonText = 'Restablecer';
    }
  }

  navigateToReset() {
    window.location.href = 'auth/reset';
  }

  navigateToSignup() {
    window.location.href = 'auth/signup';
  }

  handleUserCredentials(userCredentials: { email: string; password: string }) {
    const { email, password } = userCredentials;

    switch (this.url) {
      case 'login':
        this.log_in(email, password);
        break;
      case 'signup':
        this.signup(email, password);
        break;
      case 'reset':
        this.resetPassword(email, password);
        break;
    }
  }

  async log_in(email: string, password: string) {
    console.log(email, password);
  }

  async signup(email: string, password: string) {
    console.log(email, password);
  }

  async resetPassword(email: string, password: string) {
    console.log(email, password);
  }
  
}
