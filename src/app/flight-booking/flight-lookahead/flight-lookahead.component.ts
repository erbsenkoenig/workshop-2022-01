import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FlightService } from '../flight-search/flight.service';
import { combineLatest, timer } from 'rxjs';
import { Flight } from '../../entities';

@Component({
  selector: 'app-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css'],
})
export class FlightLookaheadComponent implements OnInit {
  formControl: FormControl;

  flights: Flight[];
  loading = false;

  constructor(private fb: FormBuilder, private flightService: FlightService) {}

  ngOnInit(): void {
    // this.formControl = new FormControl();
    this.formControl = this.fb.control(null);

    this.formControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap((value: string) => {
          // return combineLatest(this.flightService.search(value), timer(700)); // DEPRECATED
          return combineLatest([this.flightService.search(value), timer(400)]);
        }),
        map((result: [Flight[], number]) => result[0])
      )
      .subscribe((flights) => {
        this.flights = flights;
        this.loading = false;
      });
  }
}
