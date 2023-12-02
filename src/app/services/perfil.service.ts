import { Inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Database } from '../models/database.types';
import { delay } from 'rxjs/operators';
import { lastValueFrom, of, Subscription } from 'rxjs';
import { SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    private authSubscription: Subscription;
    private asistenciasSubject = new BehaviorSubject<any[]>([]);
public asistencias$ = this.asistenciasSubject.asObservable();

    constructor(private authService: AuthService, @Inject('SupabaseClient') private supabase: SupabaseClient<Database>) {
        this.authSubscription = this.authService.authState$.subscribe(() => {
            this.getUserProfile().then(data => {
                if (data) {
                    console.log("Perfil del usuario cargado:", data);
                }
            });
        });
    }

    private MAX_RETRIES = 3;
    async getUserProfile(retries = this.MAX_RETRIES): Promise<any> {
        for (let i = 0; i < retries; i++) {
            try {
                const id = await this.authService.getCurrentUserId();

                if (!id) {
                    console.error("ID is not valid:", id);
                    return null;
                }

                const { data, error } = await this.supabase
                    .from('perfil_detalle')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error("Error fetching user profile from Supabase:", error.message);
                    throw error;
                }

                if (!data) {
                    console.warn("No user profile found for ID:", id);
                    throw new Error("No user profile found");
                }

                return data;
            } catch (err: Error | any) {
                if (i === retries - 1) {
                    console.error("Max retries reached. An unexpected error occurred:", err.message);
                    return null;
                }
                console.warn("Retry fetching user profile...");
                await of(null).pipe(delay(1000)).toPromise();
            }
        }
    }

    ngOnDestroy() {
        // Cancelar la suscripción para evitar fugas de memoria
        this.authSubscription.unsubscribe();
    }

    async getAsistenciaEstudiante(id: string) {
        try {
            const { data, error } = await this.supabase
                .from('asistencia_por_id')
                .select(`
                    id,
                    primer_nombre,
                    apellido_paterno,
                    fecha_sesion_clase,
                    descripcion,
                    nom_asignatura
                `)
                .eq('id', id);
    
            if (error) throw error;
            this.asistenciasSubject.next(data);
            return data;
        } catch (error) {
            console.error('Error obteniendo asistencia:', error);
            return null;
        }
    }

    async getHorarioDocenteHoy(idDocente: string) {
        try {
            const nombresDias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const hoy = new Date();
            const nombreDiaHoy = nombresDias[hoy.getDay()]; // Obtener el nombre del día de hoy
    
            const { data, error } = await this.supabase
                .from('horario_docente')  // Asegúrate de que el nombre de la vista sea correcto
                .select(`
                    dia_semana,
                    hora_inicio,
                    hora_fin,
                    sala,
                    nom_asignatura,
                    nom_seccion
                `)
                .eq('id', idDocente)  // Suponiendo que la columna para filtrar por docente es 'id_docente'
                .eq('dia_semana', nombreDiaHoy)  // Filtrando por el nombre del día actual
                .order('hora_inicio', { ascending: true });  // Ordenando por hora de inicio
    
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error obteniendo horario del docente para el día de hoy:', error);
            return null;
        }
    }
}