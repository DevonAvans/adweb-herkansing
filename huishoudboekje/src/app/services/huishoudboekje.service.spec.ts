import { TestBed } from '@angular/core/testing';

import { HuishoudboekjeService } from './huishoudboekje.service';

describe('HuishoudboekjeService', () => {
  let service: HuishoudboekjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuishoudboekjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
