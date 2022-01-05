import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { SharedModule } from '../shared/shared.module';
import { FlightCardComponent } from './flight-search/flight-card/flight-card.component';
import { FlightStatusToggleComponent } from './flight-search/flight-card/flight-status-toggle/flight-status-toggle.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightBookingRoutingModule } from './flight-booking-routing.module';
import { FlightLookaheadComponent } from './flight-lookahead/flight-lookahead.component';

@NgModule({
  declarations: [FlightSearchComponent, FlightCardComponent, FlightStatusToggleComponent, FlightEditComponent, FlightLookaheadComponent],
  imports: [CommonModule, SharedModule, FlightBookingRoutingModule],
})
export class FlightBookingModule {}
