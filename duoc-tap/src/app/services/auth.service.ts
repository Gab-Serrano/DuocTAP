import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

/* SUPABASE */
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Database } from '../models/database'
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

    async login(email: string, password: string) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (data.user?.id && data.session?.access_token && data.user?.email) {
                Preferences.set({ key: 'currentUserToken', value: data.session.access_token.toString() })
                Preferences.set({ key: 'currentUserId', value: data.user.id.toString() })
                Preferences.set({ key: 'currentUserEmail', value: data.user.email.toString() })
            }
        } catch (error) {
            alert((error as Error).message)
        }
    }

    async signup(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        })

        if (error) {
            alert(error.message)
        } else {
            this.router.navigate(['/'])
        }
    }

    async logout() {
        const { error } = await supabase.auth.signOut()

        if (error) {
            alert(error.message)
        } else {
            this.router.navigate(['/login'])
        }
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('currentUserToken');
    }

    getCurrentUserToken(): string | null {
        return localStorage.getItem('currentUserToken');
    }
}