import { ValidatorFn, AbstractControl } from '@angular/forms';

export function matchValidator(match: AbstractControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if(match == null){
      return null;
    }
    const forbidden = control.value !== match.value;
    return forbidden ? {'noMatch': {value: control.value}} : null;
  };
}
