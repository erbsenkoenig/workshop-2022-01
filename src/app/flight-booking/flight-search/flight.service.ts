import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Flight } from '../../entities';
import { Observable, of, throwError } from 'rxjs';
import { BASE_URL } from './tokens';
import { catchError } from 'rxjs/operators';

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

    return this.http.get<Flight[]>(this.url, { params, headers }).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status >= 400 && error.status < 500) {
            throwError(() => 'INVALID USER INPUT');
          }
        }

        // add toast nofitifaction
        return of([]);
      })
    );
  }

  search(from: string): Observable<Flight[]> {
    const params = new HttpParams().set('from', from);
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
