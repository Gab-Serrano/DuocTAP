import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AuthenticationService } from '../../services/authentication.service';

/* UPDATE */
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, 
    MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, RouterModule, FormsModule]
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private AuthenticationService: AuthenticationService, private router: Router, private authService: AuthService ) { }

  onLogin() {
    /* UPDATE */
    this.authService.login(this.email, this.password);

    this.AuthenticationService.login(this.email, this.password).subscribe(isSuccessful => {
      if (isSuccessful) {
        this.router.navigate(['/home']);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    }
    );
  }

  ngOnInit() {
  }

}
