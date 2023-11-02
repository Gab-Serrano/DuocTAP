import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenQrService {

  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  constructor() {}

  async storeSessionInDatabase(sessionId: string, currentUserId: string): Promise<void> {
    const { data: seccionData, error: seccionError } = await this.supabase
      .from('seccion')
      .select('id_seccion')
      .eq('id', currentUserId)
      .limit(1);

    if (seccionError) {
      console.error('Error fetching section ID:', seccionError);
      throw seccionError;
    }

    if (!seccionData || seccionData.length === 0) {
      console.error('No section found for user ID:', currentUserId);
      throw new Error('No section found');
    }

    const id_seccion = seccionData[0].id_seccion;

    const { error } = await this.supabase
      .from('sesion-clase')
      .insert([{
        id_sesion_clase: sessionId,
        id_seccion: id_seccion,
        fecha_sesion_clase: new Date().toISOString(),
        qr_data: sessionId, // Puedes cambiar el nombre de este campo en el futuro
        esta_activa: true
      }]);

    if (error) {
      console.error('Error storing session:', error);
      throw error;
    }
  }
}