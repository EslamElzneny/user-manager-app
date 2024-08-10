import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone:true,
  name: 'searching'
})
export class SearchFirebasePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    let itemsArr = items.filter(it => {
      if(it?.name?.toLocaleLowerCase().includes(searchText)){
        return true;
      }
      return false
    });

    return itemsArr;
  }

}
