import {AbstractControl, ValidatorFn} from '@angular/forms';

export const validateCity: ValidatorFn = (control: AbstractControl) => {
  const validCities = ['Berlin', 'München', 'Hamburg'];

  if(validCities.some(city => city === control.value)) {
    return null;
  }

  return {
    city: {actualValue: control.value, validCities}
  }
}

