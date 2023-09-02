import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'cambio-pass',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cambio-pass',
    loadComponent: () => import('./cambio-pass/cambio-pass.page').then( m => m.CambioPassPage)
  },
  
];
