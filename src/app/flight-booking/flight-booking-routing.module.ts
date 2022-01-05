import { RouterModule } from '@angular/router';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightEditComponent } from './flight-edit/flight-edit.component';

export const FlightBookingRoutingModule = RouterModule.forChild([
  {
    path: 'flights',
    pathMatch: 'full',
    component: FlightSearchComponent,
  },
  {
    path: 'flights/:id',
    component: FlightEditComponent,
  },
]);
