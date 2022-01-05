import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PassengerComponent } from './passenger/passenger.component';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { PassengerModule } from './passenger/passenger.module';

@NgModule({
  imports: [BrowserModule, HttpClientModule, FormsModule, PassengerModule, AppRoutingModule],
  declarations: [AppComponent, SidebarComponent, NavbarComponent, HomeComponent, PassengerComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
