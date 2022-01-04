import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Flight } from '../../entities';
import { Observable } from 'rxjs';
import { BASE_URL } from './tokens';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient, @Inject(BASE_URL) private url) {
    console.log('HELLO WORLD, FLIGHT SERVICE');
  }

  searchFlights(from: string, to: string): Observable<Flight[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Flight[]>(this.url, { params, headers });
  }

  saveFlight(flight: Flight): Observable<Flight> {
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post<Flight>(this.url, flight, { headers });
  }

  getFlight(id: string): Observable<Flight> {
    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.get<Flight>(`${this.url}/${id}`, { headers });
  }
}
