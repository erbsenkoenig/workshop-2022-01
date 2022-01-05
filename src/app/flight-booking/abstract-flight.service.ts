import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../entities';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root',
  useClass: FlightService,
})
export abstract class AbstractFlightService {
  abstract searchFlights(from: string, to: string): Observable<Flight[]>;
}
