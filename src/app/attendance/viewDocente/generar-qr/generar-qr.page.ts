import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { PerfilService } from '../../../services/perfil.service';
import { Preferences } from '@capacitor/preferences';
import { QRCodeModule } from 'angularx-qrcode';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QRCodeModule]
})
export class GenerarQRPage implements OnInit {
  qrCodeValue: string | null = null;

  constructor(private router: Router, private perfilService: PerfilService, private attServ: AttendanceService) { }

  ngOnInit() {
    
  }

  async generateQRCode() {
    const newUUID = uuidv4();
    this.qrCodeValue = newUUID;

    console.log('UUID generado:', this.qrCodeValue);
    
    const currentUserId = (await Preferences.get({ key: 'currentUserId' })).value;

    this.attServ.guardarSesionClase(this.qrCodeValue, currentUserId?.toString() || '');
    
}

  goBack() {
    this.router.navigate(['/home']); // O la ruta de tu página principal
  }

}
