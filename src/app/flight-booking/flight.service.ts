import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Flight } from '../entities';
import { Observable, of, throwError } from 'rxjs';
import { BASE_URL } from './flight-search/tokens';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private readonly headers = new HttpHeaders().set('Accept', 'application/json');

  constructor(private http: HttpClient, @Inject(BASE_URL) private url) {
    console.log('HELLO WORLD, FLIGHT SERVICE');
  }

  searchFlights(from: string, to?: string): Observable<Flight[]> {
    const params: { [key: string]: string } = { from };
    if (to) {
      params['to'] = to;
    }
    return this.http.get<Flight[]>(this.url, { params, headers: this.headers }).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status >= 400 && error.status < 500) {
            return throwError('INVALID USER INPUT');
          }
        }

        // add toast notification or other global error handling
        return of([]);
      })
    );
  }

  saveFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.url, flight, { headers: this.headers });
  }

  getFlight(id: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.url}/${id}`, { headers: this.headers });
  }
}
