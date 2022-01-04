import { RouterModule } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';

export const FlightBookingRoutingModule = RouterModule.forChild([
  {
    path: 'flight-search',
    component: FlightSearchComponent,
  },
]);
