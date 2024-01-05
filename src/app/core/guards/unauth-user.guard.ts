import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const unauthUserGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkUserAuth();
  if(authService.isUserAuth()) {
    router.navigate(['/dashboard']);
    return false;
  } else {
    return true;
  }

};
