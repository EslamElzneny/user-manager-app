import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unauthUserGuard } from './unauth-user.guard';

describe('unauthUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unauthUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
