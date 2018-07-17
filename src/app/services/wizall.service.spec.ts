import { TestBed, inject } from '@angular/core/testing';

import { WizallService } from './wizall.service';

describe('WizallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WizallService]
    });
  });

  it('should be created', inject([WizallService], (service: WizallService) => {
    expect(service).toBeTruthy();
  }));
});
