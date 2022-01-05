import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
  from: string;
  to: string;

  flights: Flight[] = [];
  // editableFlight: Flight;

  basket: object = {}; // {5: true}

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {}

  search(): void {
    this.flightService.searchFlights(this.from, this.to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
    });
  }

  // old edit way
  // selectForEdit(flight: Flight) {
  //   this.editableFlight = flight;
  // }

  updateBasket(newValue: boolean, flightId: number) {
    this.basket[flightId] = newValue; // {52: true}
  }

  // old edit way
  // updateFlights(flight: Flight) {
  //   const mappedFlight = this.flights.map((oldFlight) => {
  //     if (oldFlight.id !== flight.id) {
  //       return oldFlight;
  //     }
  //     return flight;
  //   });
  //
  //   this.flights = [...mappedFlight];
  // }

  get searchDisabled() {
    return !this.from || !this.to;
  }
}
