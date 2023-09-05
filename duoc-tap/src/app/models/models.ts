export interface User {
    userId: number; // este será el enlace a userDetails
    username: string;
    password: string;
    token: string;
    rol: string;
  }
  
  export interface UserDetails {
    userId: number;
    rut: string;
    nombre: string;
    apellido: string;
    carrera: string;
    sede: string;
  }
