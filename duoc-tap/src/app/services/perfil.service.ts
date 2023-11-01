import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Database } from '../models/database.types';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

/* SUPABASE */
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

const supabase = createClient<Database>(
    environment.supabaseUrl,
    environment.supabaseKey
)

@Injectable({
    providedIn: 'root'
})
export class PerfilService {
    constructor(private authService: AuthService) { }
    private MAX_RETRIES = 3;

    async getUserProfile(retries = this.MAX_RETRIES): Promise<any> {
        for (let i = 0; i < retries; i++) {
            try {
                const id = await this.authService.getCurrentUserId();
    
                if (!id) {
                    console.error("ID is not valid:", id);
                    return null;
                }
    
                const { data, error } = await supabase.from('perfil_detalle').select('*').eq('id', id).single();
    
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
}