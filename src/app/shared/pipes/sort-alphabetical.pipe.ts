import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'sortAlphabetical'
})
export class SortAlphabeticalPipe implements PipeTransform {

  transform(array: any[], order: 'a-z' | 'z-a'): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    let nameA:string = '';
    let nameB:string = '';
    array.sort((a, b) => {
      if (order === 'a-z') {
        return b['first_name'] > a['first_name'] ? 1 : -1;
      } else {
        return a['first_name'] < b['first_name'] ? 1 : -1;
      }
    });

    console.log('array=>',array)

    return array;
  }

}
