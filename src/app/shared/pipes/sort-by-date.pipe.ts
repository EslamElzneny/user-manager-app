import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(array: any[], order: 'asc' | 'desc'): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    array.sort((a, b) => {
      if (order === 'asc') {
        return b['created_at']?.seconds - a['created_at']?.seconds;
      } else {
        return a['created_at']?.seconds - b['created_at']?.seconds;
      }
    });

    return array;
  }

}
