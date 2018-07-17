import { TestBed, inject } from '@angular/core/testing';

import { TigocashService } from './tigocash.service';

describe('TigocashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TigocashService]
    });
  });

  it('should be created', inject([TigocashService], (service: TigocashService) => {
    expect(service).toBeTruthy();
  }));
});
