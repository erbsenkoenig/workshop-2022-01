import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Flight } from '../entities';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root',
})
export class FlightDataService {
  private _flights$: ReplaySubject<Flight[]> = new ReplaySubject<Flight[]>(1);

  constructor(private flightService: FlightService) {}

  loadFlights(from: string) {
    this._flights$.next(null);
    return this.flightService.search(from).subscribe((val) => this._flights$.next(val));
  }

  get flights$(): Observable<Flight[]> {
    return this._flights$.asObservable();
  }
}
