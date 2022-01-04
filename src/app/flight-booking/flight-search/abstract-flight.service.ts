import { Injectable } from '@angular/core';
import { FlightService } from './flight.service';
import { Observable } from 'rxjs';
import { Flight } from '../../entities';

@Injectable({
  providedIn: 'root',
  useClass: FlightService,
})
export abstract class AbstractFlightService {
  abstract searchFlights(from: string, to: string): Observable<Flight[]>;
}
