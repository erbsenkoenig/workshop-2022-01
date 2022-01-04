import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityPipe } from './city.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CityPipe],
  imports: [CommonModule],
  exports: [CityPipe, FormsModule],
})
export class SharedModule {}
