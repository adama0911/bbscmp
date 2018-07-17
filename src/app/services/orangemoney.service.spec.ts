import { TestBed, inject } from '@angular/core/testing';

import { OrangemoneyService } from './orangemoney.service';

describe('OrangemoneyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrangemoneyService]
    });
  });

  it('should be created', inject([OrangemoneyService], (service: OrangemoneyService) => {
    expect(service).toBeTruthy();
  }));
});
