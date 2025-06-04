  import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
  import { provideRouter, withHashLocation } from '@angular/router';

  import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
  import { APP_ROUTES } from './app.routing';
  import { provideHttpClient } from '@angular/common/http';

  export const appConfig: ApplicationConfig = {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideClientHydration(withEventReplay()),
      provideRouter(APP_ROUTES, withHashLocation()),
      provideHttpClient()
    ]
  };
