import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { PerfilService } from '../services/perfil.service';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Database } from '../models/database.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, MatTabsModule]
})
export class HomePage implements OnInit {
  detallePerfil: Database['public']['Views']['perfil_detalle']['Row'] | undefined;
  asistencias: any[] | null = [];
  
  constructor(private perfServ: PerfilService, private authServ: AuthService, private loadingCtrl: LoadingController) { }

  onLogout() {
    this.authServ.logout();
  }

  async ngOnInit() {
    await this.showLoading();
    try {
      this.detallePerfil = await this.perfServ.getUserProfile();
      if (this.detallePerfil?.id) {
        this.asistencias = await this.perfServ.getAsistenciaEstudiante(this.detallePerfil.id);
      }
    } catch (err: Error | any) {
      console.error("Error:", err.message);
      alert("Error: " + err.message);
      this.onLogout();
    } finally {
      await this.hideLoading();
    }
  }

  async showLoading(message: string = 'Cargando...') {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent'
    });
    await loading.present();
  }

  async hideLoading() {
    await this.loadingCtrl.dismiss();
  }

}
