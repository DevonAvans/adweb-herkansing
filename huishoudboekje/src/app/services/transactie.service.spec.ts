import { TestBed } from '@angular/core/testing';

import { TransactieService } from './transactie.service';

describe('TransactieService', () => {
  let service: TransactieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
