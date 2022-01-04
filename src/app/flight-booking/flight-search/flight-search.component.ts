import { Component, OnInit } from '@angular/core';
import { Flight } from '../../entities';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
  providers: [FlightService],
})
export class FlightSearchComponent implements OnInit {
  from: string;
  to: string;

  flights: Flight[] = [];
  selectedFlight: Flight;

  basket: object = {}; // {5: true}

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {}

  search(): void {
    this.flightService.searchFlights(this.from, this.to).subscribe({
      next: (flights) => (this.flights = flights),
    });
  }

  select(flight: Flight) {
    this.selectedFlight = flight;
  }

  onSubmit(value: any) {
    console.log(value);
    this.search();
  }

  updateBasket(newValue: string, flightId: number) {
    console.log(newValue);
    this.basket[flightId] = newValue === 'SELECTED' ? true : false; // {52: true}
  }

  get searchDisabled() {
    return !this.from || !this.to;
  }
}
