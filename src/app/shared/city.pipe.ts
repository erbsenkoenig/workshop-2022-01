import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city',
})
export class CityPipe implements PipeTransform {
  transform(value: string, format: 'short' | 'full' = 'short'): string {
    console.log('PIPE TRANSFORM');
    if (value === 'Berlin') {
      return 'BER';
    }

    if (value === 'Frankfurt') {
      return 'FRA';
    }

    if (value === 'München') {
      return 'MUC';
    }

    return value;
  }
}
