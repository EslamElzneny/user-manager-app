import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { metaDataResolver } from './meta-data.resolver';

describe('metaDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => metaDataResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
