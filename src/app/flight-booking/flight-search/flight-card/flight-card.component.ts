import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import { Flight } from '../../../entities';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() flight: Flight;
  @Input() selected: boolean;

  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
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
    this.selectedChange.next('SELECTED');
  }

  deselect() {
    this.selectedChange.next('DESELECTED');
  }
}
