import { TestBed, inject } from '@angular/core/testing';

import { EmoneyService } from './emoney.service';

describe('EmoneyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmoneyService]
    });
  });

  it('should be created', inject([EmoneyService], (service: EmoneyService) => {
    expect(service).toBeTruthy();
  }));
});
