import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController, LoadingController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { PerfilService } from '../services/perfil.service';
import { AuthService } from '../services/auth.service';
import { Database } from '../models/database.types';
import { EnvironmentInjector, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, MatTabsModule,],
})
export class HomePage implements OnInit {
  detallePerfil: Database['public']['Views']['perfil_detalle']['Row'] | undefined;
  asistencias: any[] | null = [];
  horarios: any[] | null = [];
  public environmentInjector = inject(EnvironmentInjector);
  
  constructor(private perfServ: PerfilService, private authServ: AuthService, private loadingCtrl: LoadingController, private menuCtrl: MenuController) { }

  onLogout() {
    this.authServ.logout().subscribe(() => {
      error: (err: Error | any) => {
        console.error("Error:", err.message);
        alert("Error: " + err.message);
      }
    });
  }

  async ngOnInit() {
    await this.showLoading();
    try {
      this.detallePerfil = await this.perfServ.getUserProfile();
      if (this.detallePerfil?.id && this.detallePerfil?.id_rol === 1) {
        this.asistencias = await this.perfServ.getAsistenciaEstudiante(this.detallePerfil.id);
      }else if (this.detallePerfil?.id && this.detallePerfil?.id_rol === 2) {
        this.horarios = await this.perfServ.getHorarioDocenteHoy(this.detallePerfil.id);
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

  openMenu() {
    this.menuCtrl.open('first');
  }

}
