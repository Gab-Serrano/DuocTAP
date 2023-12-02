import { Component, OnInit, NgZone } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DialogService } from '../../../services/dialog/dialog.service';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../../services/auth.service';

import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-barcode-scanning',
  templateUrl: './barcode-scanning.page.html',
  styleUrls: ['./barcode-scanning.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class BarcodeScanningPage implements OnInit {
  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });
  public scannedBarcode: Barcode | null = null;
  public isSupported = false;
  public isPermissionGranted = false;

  constructor(private router: Router, private fb: FormBuilder, private attServ: AttendanceService, private alertController: AlertController, private menuCtrl: MenuController, private authServ: AuthService, private readonly dialogService: DialogService, private readonly ngZone: NgZone, private loadingController: LoadingController) {

  }

  public async ngOnInit(): Promise<void> {
    console.log('ngOnInit: Iniciando BarcodeScanningPage');
    try {
      const result = await BarcodeScanner.isSupported();
      this.isSupported = result.supported;
      console.log('Soporte de escáner:', result.supported);

      if (!this.isSupported) {
        this.showNotSupportedAlert();
      }
    } catch (error) {
      console.error('Error al verificar el soporte del escáner', error);
    }

    const permissionStatus = await BarcodeScanner.checkPermissions();
    console.log('Estado de los permisos:', permissionStatus.camera);
    if (permissionStatus.camera !== 'granted') {
        await BarcodeScanner.requestPermissions();
    }

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
    BarcodeScanner.removeAllListeners().then(() => {
      BarcodeScanner.addListener(
        'googleBarcodeScannerModuleInstallProgress',
        (event) => {
          console.log('Evento barcodeScanned:', event);
          this.ngZone.run(() => {
            console.log('googleBarcodeScannerModuleInstallProgress', event);
            const { state, progress } = event;
            this.formGroup.patchValue({
              googleBarcodeScannerModuleInstallState: state,
              googleBarcodeScannerModuleInstallProgress: progress,
            });
          });
        }
      );
    });

    try {
      // Intenta instalar el módulo de Google si es necesario
      await this.installGoogleBarcodeScannerModuleIfNeeded();
    } catch (error) {
      console.error('Error al instalar el módulo del escáner de Google', error);
    }

  }

  private async installGoogleBarcodeScannerModuleIfNeeded(): Promise<void> {
    // Comprueba si el módulo está instalado y si no, instálalo
    const isModuleInstalled = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
    console.log('Módulo del escáner de Google instalado:', isModuleInstalled);
  
    if (!isModuleInstalled) {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      console.log('Módulo del escáner de Google instalado correctamente');
    }
  }

  public async startScan(): Promise<void> {
    console.log('startScan: Iniciando escaneo');
    const formats = this.formGroup.get('formats')?.value || [];
    const lensFacing =
      this.formGroup.get('lensFacing')?.value || LensFacing.Back;
    const element = await this.dialogService.showModal({
      component: BarcodeScanningModalComponent,
      // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        this.scannedBarcode = barcode || null;
      }
    });
  }

  public async scan(): Promise<void> {
    try {
      const formats = this.formGroup.get('formats')?.value || [];
      const { barcodes } = await BarcodeScanner.scan({ formats });
      this.scannedBarcode = barcodes[0] || null;
    } catch (error: any) {
      if (error.message.includes('Google Barcode Scanner Module is not available')) {
          await this.installGoogleBarcodeScannerModule();
          // Opcionalmente, reintenta el escaneo después de la instalación
      } else {
          console.error('Error durante el escaneo', error);
      }
  }
}

  public async openSettings(): Promise<void> {
    await BarcodeScanner.openSettings();
  }

  public async requestPermissions(): Promise<void> {
    await BarcodeScanner.requestPermissions();
  }

  private async handleGoogleModuleNotAvailable(): Promise<void> {
    try {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      console.log('Módulo del escáner de Google instalado correctamente, reintente el escaneo');
    } catch (installError) {
      console.error('Error al instalar el módulo del escáner de Google', installError);
    }
  }


  onSubmit() {

  }

  goBack() {
    this.router.navigate(['/home']); // O la ruta de tu página principal
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }


  openMenu() {
    this.menuCtrl.open('second');
  }

  onLogout() {
    this.authServ.logout().subscribe(() => {
      error: (err: Error | any) => {
        console.error("Error:", err.message);
        alert("Error: " + err.message);
      }
    });
  }

  async showNotSupportedAlert() {
    const alert = await this.alertController.create({
      header: 'Scanner Not Supported',
      message: 'The barcode scanner is not supported on this device.',
      buttons: ['OK']
    });

    await alert.present();
  }

  public async installGoogleBarcodeScannerModule(): Promise<void> {
    const loading = await this.loadingController.create({
        message: 'Instalando módulo del escáner...',
        // Otras opciones de configuración si es necesario
    });
    await loading.present();

    try {
        await BarcodeScanner.installGoogleBarcodeScannerModule();
        console.log('Módulo del escáner de Google instalado correctamente');
    } catch (error) {
        console.error('Error al instalar el módulo del escáner de Google', error);
    } finally {
        await loading.dismiss();
    }
}
}

