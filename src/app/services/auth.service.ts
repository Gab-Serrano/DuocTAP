import { Injectable, EventEmitter, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../models/database.types';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authChanged = new EventEmitter<boolean>();

    constructor(private router: Router, @Inject('SupabaseClient') private supabase: SupabaseClient<Database>) { }

    async login(email: string, password: string): Promise<void> {
        const { data, error } = await this.supabase.auth.signInWithPassword({
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

        this.authChanged.emit(true);
    }

    async logout() {
        const { error } = await this.supabase.auth.signOut()
        Preferences.remove({ key: 'currentUserToken'})
        Preferences.remove({ key: 'currentUserId'})
        Preferences.remove({ key: 'currentUserEmail'})

        if (error) {
            console.log(error.message)
        } else {
            this.router.navigate(['/login'])
        }
        this.authChanged.emit(false);
    }

    async isLoggedIn(): Promise<boolean> {
        const { value } = await Preferences.get({ key: 'currentUserToken' });
        return !!value;
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