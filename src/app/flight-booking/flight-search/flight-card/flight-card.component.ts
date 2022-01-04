import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from '../../../entities';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.css'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight: Flight;
  @Input() selected: boolean;

  @Output() selectedChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  select() {
    this.selected = true;
    this.selectedChange.emit('SELECTED');
  }

  deselect() {
    this.selected = false;
    this.selectedChange.emit('DESELECTED');
  }
}
