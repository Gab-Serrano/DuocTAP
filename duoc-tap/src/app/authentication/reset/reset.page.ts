import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ]
})
export class ResetPage implements OnInit {

  constructor(private toastController: ToastController) { }

  async presentToast(position: 'top') {
    const toast = await this.toastController.create({
      message: '!Correo enviado!',
      duration: 2000,
      position: position,
    });
    await toast.present();
  }

  ngOnInit() {
  }

}
