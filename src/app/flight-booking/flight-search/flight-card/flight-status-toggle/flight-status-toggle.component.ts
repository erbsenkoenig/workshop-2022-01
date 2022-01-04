import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-flight-status-toggle',
  templateUrl: './flight-status-toggle.component.html',
  styleUrls: ['./flight-status-toggle.component.css']
})
export class FlightStatusToggleComponent implements OnInit {

  @Input() delayed: boolean;
  @Output() delayedChange: EventEmitter<boolean>  = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  delay() {
    this.delayedChange.emit(!this.delayed);
  }

  get text() {
    if(this.delayed) {
      return 'DELAYED';
    }
    return 'ON TIME'
  }

}
