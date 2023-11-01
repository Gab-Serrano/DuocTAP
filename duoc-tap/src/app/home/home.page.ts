import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { User, UserDetails } from '../models/models';
import { ProfileService} from '../services/profile.service';
import { AuthenticationService } from '../services/authentication.service';

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

  constructor(private profServ: ProfileService, private authServ: AuthenticationService) { }

  onLogout() {
    this.authServ.logout();
  }

  ngOnInit() {
    const token = localStorage.getItem('currentUserToken');
    if (token) {
      this.profServ.getUserDetails().subscribe(
        (data) => {
          console.log("User Details:", data);  // Agrega esto
          this.userDetails = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.profServ.getUserCredentials().subscribe(
        (data) => {
          console.log("User Credentials:", data);  // Agrega esto
          this.userCredentials = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
