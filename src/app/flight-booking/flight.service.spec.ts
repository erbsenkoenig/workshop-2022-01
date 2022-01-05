import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FlightService } from './flight.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FlightService', () => {
  let service: FlightService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // providers: [
      //   {
      //     provide: BASE_URL,
      //     useValue: 'BASE_URL',
      //   },
      // ],
    });
    service = TestBed.inject(FlightService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return flight by id', () => {
    service.getFlight('FLIGHT_ID').subscribe((result: any) => {
      expect(result).toEqual('FLIGHT');
    });

    const request = testingController.expectOne('http://www.angular.at/api/flight/FLIGHT_ID');
    request.flush('FLIGHT');
  });

  describe('searchFlights', () => {
    it('should search flights with only from param', () => {
      service.searchFlights('FROM').subscribe((result: any) => {
        expect(result).toEqual('FLIGHTS');
      });

      const request = testingController.expectOne('http://www.angular.at/api/flight?from=FROM');
      request.flush('FLIGHTS');
    });

    it('should search flights with from and to param if available', fakeAsync(() => {
      let result;
      service.searchFlights('FROM', 'TO').subscribe((r: any) => {
        result = r;
      });

      const request = testingController.expectOne('http://www.angular.at/api/flight?from=FROM&to=TO');
      request.flush('FLIGHTS');

      tick();
      expect(result).toEqual('FLIGHTS');
    }));

    it('should return empty result if error not within 400 and 500', () => {
      service.searchFlights('FROM', 'TO').subscribe((result: any) => {
        expect(result).toEqual([]);
      });

      const request = testingController.expectOne('http://www.angular.at/api/flight?from=FROM&to=TO');
      request.error('ERROR' as any);
    });

    it('should throw error if api returns 400er error', fakeAsync(() => {
      let result;
      service.searchFlights('FROM', 'TO').subscribe({
        error: (error) => (result = error),
      });

      const request = testingController.expectOne('http://www.angular.at/api/flight?from=FROM&to=TO');
      request.error('ERROR' as any, { status: 400 });

      tick();

      expect(result).toEqual('INVALID USER INPUT');
    }));
  });
});
