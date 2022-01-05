import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PassengerComponent } from './passenger/passenger.component';

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
    path: 'flights',
    loadChildren: () => import('./flight-booking/flight-booking.module').then((m) => m.FlightBookingModule),
  },
]);
