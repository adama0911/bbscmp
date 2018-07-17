import { TestBed, inject } from '@angular/core/testing';

import { PostcastService } from './postcast.service';

describe('PostcastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostcastService]
    });
  });

  it('should be created', inject([PostcastService], (service: PostcastService) => {
    expect(service).toBeTruthy();
  }));
});
