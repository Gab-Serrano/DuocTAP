import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { of } from "rxjs";
import { AuthService } from "../auth.service";

export const canActivatePath: CanActivateFn = async  (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const loggedIn = await authService.isLoggedIn();
  if (!loggedIn) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};