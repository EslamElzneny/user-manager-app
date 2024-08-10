import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  standalone:true,
  name: 'dateDisplayFirebase',
})
export class DateDisplayFirebasePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(date: Timestamp | undefined): string {
    if(date instanceof Timestamp){
      return this.datePipe.transform(date?.toMillis(), 'short') ?? '';
    }else{
      return ''
    }
  }

}
