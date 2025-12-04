import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtInterceptor } from './interceptors/jwt-interceptor';

export function tokenGetter() {
  if (typeof window === 'undefined') {
    return null;
  }

  const token = window.sessionStorage.getItem('token');
  return token && token.split('.').length === 3 ? token : null;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          // AQUÍ ESTÁ LA CLAVE:
          // 1. Agregamos el dominio de Render (SIN https://)
          // 2. Mantenemos localhost para cuando trabajes en tu PC
          allowedDomains: ['localhost:8080', 'viviestuv2.onrender.com'],

          // Actualizamos las rutas donde NO queremos enviar token
          disallowedRoutes: [
            'http://localhost:8080/login/forget',
            'https://viviestuv2.onrender.com/login/forget']
        },
      })
    ),
  ],
};
