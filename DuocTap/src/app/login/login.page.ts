import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule ,Router } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, 
    MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule,NgIf]
})
export class LoginPage implements OnInit {
  
  email: string = '';
  password: string = '';
  constructor(private router: Router) {}
  navigateToPerfil() {
    this.router.navigate(['/perfil']); // Navegar a la página de perfil
  }
  navigateToCambioPass() {
    this.router.navigate(['/cambio-pass']); // Navegar a la página de cambio de contraseña
  }
  ngOnInit() {  
    
  }

}
