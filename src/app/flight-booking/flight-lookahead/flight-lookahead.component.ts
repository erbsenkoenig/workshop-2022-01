import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { FlightService } from '../flight-search/flight.service';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject, Subject, Subscription, timer } from 'rxjs';
import { Flight } from '../../entities';

@Component({
  selector: 'app-flight-lookahead',
  templateUrl: './flight-lookahead.component.html',
  styleUrls: ['./flight-lookahead.component.css'],
})
export class FlightLookaheadComponent implements OnInit, OnDestroy {
  formControl: FormControl;

  flights: Flight[];
  loading = false;

  flights$: Observable<Flight[]>;

  private subs: Subscription[] = [];

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.testSubjects();
  }

  ngOnInit(): void {
    // this.formControl = new FormControl();
    this.formControl = this.fb.control(null);

    // alternative instead of subscribing manually assign observable to variable and
    // use that in the template with async pipe
    //
    // this.flights$ = this.formControl.valueChanges.pipe(
    //   debounceTime(200),
    //   distinctUntilChanged(),
    //   tap(() => (this.loading = true)),
    //   switchMap((value: string) => {
    //     // return combineLatest(this.flightService.search(value), timer(700)); // DEPRECATED
    //     return combineLatest([this.flightService.search(value), timer(400)]);
    //   }),
    //   map((result: [Flight[], number]) => result[0]),
    //   tap(() => (this.loading = false))
    // );

    this.subs.push(
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
        })
    );
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

  testSubjects() {
    const subject$ = new Subject();

    subject$.next('HELLO');
    this.subs.push(subject$.subscribe((value) => console.log('SUBJECT', value)));
    subject$.next('WORLD');

    const behaviourSubject = new BehaviorSubject('INITIAL');
    behaviourSubject.next('HELLO');
    this.subs.push(behaviourSubject.subscribe((value) => console.log('BEHAVIOR_SUBJECT', value)));
    behaviourSubject.next('WORLD');

    const replaySubject$ = new ReplaySubject();
    replaySubject$.next('INITIAL');
    replaySubject$.next('HELLO');
    this.subs.push(replaySubject$.subscribe((value) => console.log('REPLAY_SUBJECT', value)));
    replaySubject$.next('WORLD');
  }
}
