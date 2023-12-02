import { Routes } from '@angular/router';
import { canActivatePath } from './services/guards/authentication.guard';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [canActivatePath],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./authentication/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'reset',
    loadComponent: () => import('./authentication/reset/reset.page').then( m => m.ResetPage)
  },
  {
    path: 'update-password',
    loadComponent: () => import('./authentication/updatePassword/updatePassword.page').then( m => m.UpdatePasswordPage)
  },
  {
    path: 'generar-qr',
    loadComponent: () => import('./attendance/viewDocente/generar-qr/generar-qr.page').then( m => m.GenerarQRPage)
  },
  {
    path: 'escanear-qr',
    loadComponent: () => import('./attendance/viewEstudiante/escanear-qr/barcode-scanning.page').then( m => m.BarcodeScanningPage)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
