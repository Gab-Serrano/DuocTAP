import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class ResetPage implements OnInit {
  /* Inicializa form para restear contraseña */
  resetForm: FormGroup = new FormGroup({});

  constructor(
    private toastController: ToastController,
    private theme: ThemeService,
    private authService: AuthService) { }

  ngOnInit() {
    /* Actualiza formulario para validar email */
    const emailRegex = '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$';
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)])
    });
  }

  async onReset() {
    if (this.resetForm.invalid) {
      this.errorToast('Debe ingresar un correo válido.');
    } else {
      await this.reset().then(() => {
        this.successToast('Se ha enviado un correo para restablecer la contraseña.');
      }).catch((error: { message: string; }) => {
        this.errorToast(error.message);
      }
      );
    }
  }

  async reset() {
    const { email } = this.resetForm.value;
    this.authService.resetPassword(email);
  }

  isDarkMode(): boolean {
    return this.theme.getDarkMode();
  }

  async successToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    toast.present();
  }

  async errorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

}
