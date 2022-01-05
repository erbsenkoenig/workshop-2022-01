import { RouterModule } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightLookaheadComponent } from './flight-lookahead/flight-lookahead.component';

export const FlightBookingRoutingModule = RouterModule.forChild([
  {
    path: 'flights',
    component: FlightSearchComponent,
  },
  {
    path: 'lookahead',
    component: FlightLookaheadComponent,
  },
  {
    path: 'flights/:id',
    component: FlightEditComponent,
  },
]);
