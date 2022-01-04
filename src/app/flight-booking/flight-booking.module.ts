import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FlightCardComponent } from './flight-search/flight-card/flight-card.component';
import { FlightStatusToggleComponent } from './flight-search/flight-card/flight-status-toggle/flight-status-toggle.component';

@NgModule({
  declarations: [FlightSearchComponent, FlightCardComponent, FlightStatusToggleComponent],
  imports: [CommonModule, SharedModule],
  exports: [FlightSearchComponent],
})
export class FlightBookingModule {}
