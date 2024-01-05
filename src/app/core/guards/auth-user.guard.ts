import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authUserGuard: CanMatchFn = (route, segments) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  authService.checkUserAuth();
  if(authService.isUserAuth()) {
    return true;
  } else {
    router.navigate(['/auth/sign-in']);
    return false;
  }
};
