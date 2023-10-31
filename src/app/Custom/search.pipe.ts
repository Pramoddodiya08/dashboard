import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchText: string, fieldsToSearch: string[]): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter((item) => {
      return fieldsToSearch.some((field) => {
        return item[field].toLowerCase().includes(searchText);
      });
    });
  }
}
