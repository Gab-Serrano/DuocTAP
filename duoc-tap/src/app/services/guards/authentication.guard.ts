import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { of } from "rxjs";
import { AuthenticationService } from '../authentication.service';

export const canActivatePath: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']); 
    return of(false);
  }
  return of(true);
};