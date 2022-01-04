import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';
import { validateCity } from '../flight-search/validators';
import { Flight } from '../../entities';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css'],
})
export class FlightEditComponent implements OnChanges {
  @Input() flight;
  @Output() flightChange: EventEmitter<Flight> = new EventEmitter<Flight>();

  result: 'SUCCESS' | 'FAILURE';
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private flightService: FlightService) {
    this.formGroup = this.fb.group({
      id: 0,
      from: [null, [Validators.required, validateCity]],
      to: [null, [Validators.required, validateCity]],
      date: null,
      delayed: null,
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.flight?.currentValue) {
      this.formGroup.patchValue(simpleChanges.flight?.currentValue);
    }
  }

  saveFlight() {
    this.result = null;
    this.flightService.saveFlight(this.formGroup.value).subscribe({
      next: (flight) => {
        this.flightChange.emit(flight);
        this.result = 'SUCCESS';
      },
      error: () => {
        this.result = 'FAILURE';
      },
    });
  }
}
