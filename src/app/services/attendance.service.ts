import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../models/database.types';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private router: Router, @Inject('SupabaseClient') private supabase: SupabaseClient<Database>, private authServ: AuthService) { }

  async guardarSesionClase(qrCodeValue: string, currentUserId: string) {
    try {
      const { data, error: selectError } = await this.supabase.from('seccion').select('id_seccion').eq('id', currentUserId).single();

      if (selectError) {
        throw selectError;
      }

      if (data && data.id_seccion) {
        const { error: insertError } = await this.supabase.from('sesion_clase').insert({
          fecha_sesion_clase: new Date().toISOString(),
          id_seccion: data.id_seccion,
          id_sesion_clase: qrCodeValue,
          esta_activa: true
        });

        if (insertError) {
          throw insertError;
        }

        console.log("Sesión de clase guardada con éxito.");

      } else {
        console.error("No se encontró el id_seccion para el usuario dado.");
      }

    } catch (error) {
      console.error("Error al guardar la sesión de clase:", error);
    }
  }

  async guardarAsistencia(uuid: string) {
    try {
      const userId = await this.authServ.getCurrentUserId();

      // Comprobar si userId es null o undefined
      if (!userId) {
        console.error("User ID is null or undefined");
        return;  // Salir del método
      }

      const { error: insertError } = await this.supabase.from('registro_asistencia').insert({
        id: userId.toString(),
        id_estado: 1,
        id_sesion_clase: uuid
      });

      if (insertError) {
        throw insertError;
      }

      console.log("Asistencia guardada con éxito.");

    } catch (error) {
      console.error("Error al guardar la asistencia:", error);
    }
  }

}
