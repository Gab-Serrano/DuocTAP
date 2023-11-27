import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /* Almacena estado de pantalla para actualizar modo oscuro */
  private isDarkMode: boolean = false;

  constructor() {

    /* Actualiza modo de pantalla según estado 
    Se inicializa en falso. Luego se crea una MediaQueryList con la MediaQuery para el modo oscuro. Posteriormente se corrobora si el modo es oscuro. Se agrega un EventListener para verificar cambios que actualizan el estado de isDarkMode.
    
    En el front, se lee el valor de isDarkMode para determinar qué logo mostrar.*/
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = prefersDark.matches;
    prefersDark.addEventListener('change', (mediaQuery) => this.setDarkMode(mediaQuery.matches));
  }

  getDarkMode() {
    return this.isDarkMode;
  }

  private setDarkMode(isDark: boolean) {
    this.isDarkMode = isDark;
  }
}
