import { RouterModule } from '@angular/router';
import { PassengerComponent } from './passenger.component';

export const PassengerRoutingModule = RouterModule.forChild([
  {
    path: 'passenger',
    component: PassengerComponent,
  },
]);
