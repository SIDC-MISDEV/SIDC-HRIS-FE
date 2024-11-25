import { AbstractControl, ValidatorFn } from '@angular/forms';

export function decimalValidator(isAllowDecimal: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const decimalPattern = /^[0-9]+(\.[0-9]+)?$/;
    const isDecimal = control.value && control.value.toString().includes('.');
    const isValid = decimalPattern.test(control.value);

    if (!isValid) {
      return { invalidDecimal: { value: control.value } };
    }

    if (!isAllowDecimal && isDecimal) {
      return { decimalNotAllowed: { value: control.value } };
    }

    return null;
  };
}