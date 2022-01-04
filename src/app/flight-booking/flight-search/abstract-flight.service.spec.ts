import { TestBed } from '@angular/core/testing';

import { AbstractFlightService } from './abstract-flight.service';

describe('AbstractFlightService', () => {
  let service: AbstractFlightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractFlightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
