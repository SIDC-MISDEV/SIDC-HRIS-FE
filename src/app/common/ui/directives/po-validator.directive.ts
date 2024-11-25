import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, FormControl } from '@angular/forms';

@Directive({
  selector: '[appPoValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PoValidatorDirective, multi: true }]
})
export class PoValidatorDirective implements Validator {

  validate(control: FormControl): { [key: string]: any } | null {
    const inputValue = control.value;
    
    if (inputValue && inputValue.length >= 2) {
      const startsInPO = inputValue.startsWith("PO");
      const nextCharacters = inputValue.substring(2);
      const isIntegerChar = /^\d+$/.test(nextCharacters) 
      

      if (startsInPO) {
        return { invalidInput: true };
      }
    }

    return null;
  }
}
