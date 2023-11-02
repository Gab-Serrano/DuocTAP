import { Inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Database } from '../models/database.types';
import { delay } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    private authSubscription: Subscription;

    constructor(private authService: AuthService, @Inject('SupabaseClient') private supabase: SupabaseClient<Database>) {
        this.authSubscription = this.authService.authChanged.subscribe(() => {
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
}