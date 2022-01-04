import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './city.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CityPipe],
  imports: [CommonModule],
  exports: [CityPipe, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
