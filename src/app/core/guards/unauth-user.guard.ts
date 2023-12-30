import { CanActivateFn } from '@angular/router';

export const unauthUserGuard: CanActivateFn = (route, state) => {
  return true;
};
