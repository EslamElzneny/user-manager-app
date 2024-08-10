import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  standalone:true,
  imports:[CommonModule,MatFormFieldModule],
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {

  @Input('control') control!:any;
  @Input('form') form!:any;
  @Input('color') color!:string;

  emailRegex = this.validation.emailPattern;
  alphaRegex = this.validation.alphaPattern;
  numericalRegex = this.validation.numerical;

  passwordRegex = this.validation.passwordPattern;
  phoneRegex = this.validation.phonePattern;


  passwordLettersPattern = this.validation.passwordLettersPattern;
  passwordNumbersPattern = this.validation.passwordNumbersPattern;
  passwordSpecialCharPattern = this.validation.passwordSpecialCharPattern;

  constructor(private validation: ValidationService) { }

  getControlName(c: AbstractControl): string | null {
    const formGroup: any = c.parent?.controls;
    if (formGroup) {
      return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }

    return null;
  }

}
