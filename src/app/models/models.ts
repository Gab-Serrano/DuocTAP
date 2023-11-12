export interface User {
  id?: number;
  username: string;
  password: string;
  token: string;
  rol: string;
  userId: number; // este será el enlace a userDetails
}

export interface UserDetails {
  userId: number;
  rut: string;
  nombre: string;
  apellido: string;
  carrera: string;
  sede: string;
}