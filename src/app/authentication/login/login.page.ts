import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {
  /* Inicializa form para login */
  loginForm: FormGroup = new FormGroup({});

  /* Almacena estado de pantalla para actualizar modo oscuro */
  isDarkMode: boolean = false;

  constructor(private router: Router, private authService: AuthService, private toastController: ToastController) { }

  ngOnInit() {
    
    /* Actualiza formulario para validar email y password */
    const emailRegex = '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$';
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    /* Actualiza modo de pantalla según estado 
    Se inicializa en falso. Luego se crea una MediaQueryList con la MediaQuery para el modo oscuro. Posteriormente se corrobora si el modo es oscuro. Se agrega un EventListener para verificar cambios que actualizan el estado de isDarkMode.
    
    En el front, se lee el valor de isDarkMode para determinar qué logo mostrar.*/
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    prefersDark.addEventListener('change', (mediaQuery) => this.updateDarkMode(mediaQuery.matches));
  }

  /* Función que corrobora si los campos son válidos antes de logear */
  async onLogin() {
    if (this.loginForm.invalid) {
      this.presentToast('Debe ingresar un usuario y contraseña válidos.');
    }else{
      await this.login();
    }
  }

  /* Función que logea al usuario */
  async login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
        next: (data) => {
            this.router.navigate(['/home']);
        },
        error: (error) => {
            this.presentToast('Error al iniciar sesión: ' + error.message);
        }
    });
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

  updateDarkMode(isDark: boolean) {
    this.isDarkMode = isDark;
  }

}