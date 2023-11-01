import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

/* SUPABASE */
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Database } from '../models/database.types'
import { Capacitor } from '@capacitor/core';

const supabase = createClient<Database>(
    environment.supabaseUrl,
    environment.supabaseKey
)

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private router: Router) { }

    async login(email: string, password: string): Promise<void> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
    
        if (data.user?.id && data.session?.access_token && data.user?.email) {
            await Promise.all([
                Preferences.set({ key: 'currentUserToken', value: data.session.access_token.toString() }),
                Preferences.set({ key: 'currentUserId', value: data.user.id.toString() }),
                Preferences.set({ key: 'currentUserEmail', value: data.user.email.toString() })
            ]);
        } else if (error) {
            console.log((error as Error).message);
            throw error;
        }
    }

    async logout() {
        const { error } = await supabase.auth.signOut()
        Preferences.remove({ key: 'currentUserToken'})
        Preferences.remove({ key: 'currentUserId'})
        Preferences.remove({ key: 'currentUserEmail'})

        if (error) {
            console.log(error.message)
        } else {
            this.router.navigate(['/login'])
        }
    }

    isLoggedIn(): boolean {
        return !!Preferences.get({ key: 'currentUserToken' });
    }

    async getCurrentUserToken(): Promise<string | null> {
        const { value } = await Preferences.get({ key: 'currentUserToken' });
        return value?.toString() || null;
    }

    async getCurrentUserId(): Promise<string | null> {
        try {
            const { value } = await Preferences.get({ key: 'currentUserId' });
    
            if (value) {
                return value.toString();
            } else {
                console.warn("No 'currentUserId' found in Preferences.");
                return null;
            }
        } catch (error: Error | any) {
            console.error("Error fetching 'currentUserId' from Preferences:", error.message);
            return null;
        }
    }

    async getCurrentUserEmail(): Promise<string | null> {
        const { value } = await Preferences.get({ key: 'currentUserEmail' });
        return value?.toString() || null;
    }
}