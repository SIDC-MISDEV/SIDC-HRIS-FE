import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function negativeValueValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    // Check if the value is a negative number
    return value < 0 ? { negativeValue: true } : null;
  };
}
