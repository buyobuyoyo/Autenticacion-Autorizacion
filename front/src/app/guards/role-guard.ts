import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rolesPermitidos: string[] = route.data['roles'] ?? [];

  if (authService.tieneRol(rolesPermitidos)) {
    return true;
  }
  return router.createUrlTree(['/sin-acceso']);
};