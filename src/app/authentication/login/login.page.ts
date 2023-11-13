import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

/* UPDATE */
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private authService: AuthService, private toastController: ToastController) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  async onLogin() {
    

    if (this.loginForm.invalid) {
      this.presentToast('Debe ingresar un usuario y contraseña válidos.');
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      await this.authService.login(email, password);
      this.router.navigate(['/home']);
    } catch (error: Error | any) {
      this.presentToast('Error al iniciar sesión: ' + error.message);
    }
  }

  async presentToast(message: string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 2000,
    position: 'top',
    color: 'danger',
  });
  toast.present();
}

}