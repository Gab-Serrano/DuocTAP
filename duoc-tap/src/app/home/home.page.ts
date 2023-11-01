import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { User, UserDetails } from '../models/models';
import { ProfileService } from '../services/profile.service';
import { AuthenticationService } from '../services/authentication.service';
import { forkJoin } from 'rxjs';

/* UPDATE */
import { PerfilService } from '../services/perfil.service';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, MatTabsModule]
})
export class HomePage implements OnInit {
  userDetails: UserDetails | undefined;
  userCredentials: User | undefined;

  constructor(private profServ: ProfileService, private AuthenticationService: AuthenticationService, private perfServ: PerfilService, private authServ: AuthService, private loadingCtrl: LoadingController) { }

  onLogout() {
    /* UPDATE */
    this.authServ.logout();

    this.AuthenticationService.logout();
  }

  async ngOnInit() {
    await this.showLoading();

    try {
      const perfil = await this.perfServ.getUserProfile();
      console.log("Perfil:", perfil);

      if (!perfil) {
        throw new Error("Unable to fetch user profile");
      }

      const token = localStorage.getItem('currentUserToken');

      if (token) {
        this.profServ.getUserDetails().subscribe(
          (data) => {
            this.userDetails = data;
          },
          (error) => {
            console.log(error);
          }
        );

        this.profServ.getUserCredentials().subscribe(
          (data) => {
            this.userCredentials = data;
          },
          (error) => {
            console.log(error);
          }
        );
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
