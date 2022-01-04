import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight-search/flight.service';
import { validateCity } from '../flight-search/validators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css'],
})
export class FlightEditComponent implements OnInit {
  result: 'SUCCESS' | 'FAILURE';
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private flightService: FlightService, private route: ActivatedRoute) {
    console.log('ID', this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: 0,
      from: [null, [Validators.required, validateCity]],
      to: [null, [Validators.required, validateCity]],
      date: null,
      delayed: null,
    });

    this.flightService.getFlight(this.route.snapshot.paramMap.get('id')).subscribe({
      next: (flight) => {
        this.formGroup.patchValue(flight);
      },
    });
  }

  saveFlight() {
    this.result = null;
    this.flightService.saveFlight(this.formGroup.value).subscribe({
      next: () => {
        this.result = 'SUCCESS';
      },
      error: () => {
        this.result = 'FAILURE';
      },
    });
  }
}
