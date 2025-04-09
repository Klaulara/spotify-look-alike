import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const sessionGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  try {
    // Verificar si la cookie 'session' está presente
    if (cookieService.check('token')) {
      return true; // Permite el acceso si la cookie está presente
    } else {
      // Si no está presente, redirige a '/auth/login'
      router.navigate(['/auth/login']);
      return false; // Bloquea el acceso a la ruta
    }
  } catch (error) {
    console.error('Error al acceder a las cookies:', error);
    return false;
  }
};

