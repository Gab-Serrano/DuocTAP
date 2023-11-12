import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.page.html',
  styleUrls: ['./escanear-qr.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EscanearQrPage implements OnInit {
  asistenciaForm: any;

  constructor(private router: Router, private fb: FormBuilder, private attServ: AttendanceService) {
    this.asistenciaForm = this.fb.group({
      uuid: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.asistenciaForm = this.fb.group({
      uuid: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.asistenciaForm && this.asistenciaForm.valid) {
      const uuid = this.asistenciaForm.get('uuid')?.value;
      if (uuid) {
        this.attServ.guardarAsistencia(uuid);
      }
    }

  }

  goBack() {
    this.router.navigate(['/home']); // O la ruta de tu página principal
  }
}
