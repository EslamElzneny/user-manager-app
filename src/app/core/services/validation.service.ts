import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  passwordPattern = /^.(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()_-]).{7,}$/;
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  numerical = '^[0-9]*$';
  preventSpaces = "^[A-Za-z][A-Za-z0-9]*$";
  phonePattern = /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}-[0-9]{4,5}$/;
  alphaPattern = /^(?:[a-zA-Z\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF]))+$/;


  // ***** password validations
  passwordLettersPattern = /[A-Za-z]/;
  passwordCapitalLetterPatter = /[A-Z]/;
  passwordSmallLetterPatter = /[a-z]/;
  passwordNumbersPattern = /\d/;
  passwordSpecialCharPattern = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

  constructor() { }


  matchingPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isNotMatched = control.get('password')?.value !== control.get('password_confirmation')?.value;
      return isNotMatched ? { unmatchedPasswords: true } : null;
    };
  }
  patternWithMessage = (pattern: RegExp, error: ValidationErrors): ValidatorFn => {
    return (control: AbstractControl): any | null => {
      if (!control?.value) {
        return null;
      }

      return pattern.test(control?.value) ? null : error;
    }
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } |null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error, else return error passed in the second parameter
      return valid ? null : error;
    };
  }


}
