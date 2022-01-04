import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PassengerComponent } from './passenger/passenger.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search.component';

export const AppRoutingModule = RouterModule.forRoot([
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'flight-booking',
    children: [
      {
        path: 'flight-search',
        component: FlightSearchComponent,
      },
    ],
  },
  {
    path: 'passenger',
    component: PassengerComponent,
  },
]);
