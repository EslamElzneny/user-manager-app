import { CanActivateFn } from '@angular/router';

export const authUserGuard: CanActivateFn = (route, state) => {
  return true;
};
