import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Flight } from '../../../entities';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() flight: Flight;
  @Input() selected: boolean;

  @Output() selectedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('CONSTRUCTOR', this.flight, this.selected);
  }

  ngOnInit(): void {
    console.log('ON INIT', this.flight, this.selected);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ON CHANGES', changes);
  }

  ngOnDestroy() {
    console.log('ON DESTROY');
  }

  select() {
    this.selectedChange.next(true);
  }

  onEdit() {
    this.router.navigate(['flight-booking', 'flights', this.flight.id]);
    // this.router.navigate([this.flight.id], { relativeTo: this.route });
  }

  deselect() {
    this.selectedChange.next(false);
  }
}
