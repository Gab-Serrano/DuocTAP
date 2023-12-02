import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';

//HTTPClient
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { environment } from './environments/environment';

//Supabase
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './app/models/database.types';

const supabase: SupabaseClient = createClient<Database>(
  environment.supabaseUrl,
  environment.supabaseKey
);

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: 'SupabaseClient', useValue: supabase },
    provideAnimations(),
],
});
