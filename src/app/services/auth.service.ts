import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../models/database.types';
import { Observable, catchError, from, of, switchMap, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    /* Crea un BehaviorSubject que emite el estado del login a los subscriptores */
    private authState = new BehaviorSubject<boolean>(false);
    /* Expone el BehaviorSubject como un observable público */
    public authState$ = this.authState.asObservable();

    constructor(private router: Router, @Inject('SupabaseClient') private supabase: SupabaseClient<Database>) { }

    login(email: string, password: string): Observable<any> {
        return from(this.supabase.auth.signInWithPassword({ email, password })).pipe(
            switchMap(({ data, error }) => {
                if (error) throw new Error(error.message);

                if (data?.user?.id && data?.session?.access_token && data?.user?.email) {
                    return this.storeUserData(data).pipe(
                        switchMap(() => {
                            this.authState.next(true);
                            return of(data);
                        })
                    );
                } else {
                    throw new Error('Error: el proceso de login no se completó correctamente.');
                }
            }),
            catchError(error => throwError(() => error))
        );
    }

    private storeUserData(data: any): Observable<void> {
        const { session, user } = data;
        return from(Promise.all([
            Preferences.set({ key: 'currentUserToken', value: session.access_token.toString() }),
            Preferences.set({ key: 'currentUserId', value: user.id.toString() }),
            Preferences.set({ key: 'currentUserEmail', value: user.email.toString() })
        ])).pipe(
            switchMap(() => of(undefined))
        );
    }

    async logout() {
        const { error } = await this.supabase.auth.signOut()
        Preferences.remove({ key: 'currentUserToken' })
        Preferences.remove({ key: 'currentUserId' })
        Preferences.remove({ key: 'currentUserEmail' })

        if (error) {
            console.log(error.message)
        } else {
            this.router.navigate(['/login'])
        }
        this.authState.next(false);
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

    async resetPassword(email: string){
        const url = environment.updatePasswordURL;
        await this.supabase.auth.resetPasswordForEmail(email, {redirectTo: url});
    }

    async updatePassword(newPassword: string){
        await this.supabase.auth.updateUser({password: newPassword});
    }
}