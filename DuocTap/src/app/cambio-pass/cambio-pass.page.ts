import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.page.html',
  styleUrls: ['./cambio-pass.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CambioPassPage implements OnInit {

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
