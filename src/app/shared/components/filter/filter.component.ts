import { Component, Input } from '@angular/core';
import { FilterOptions } from '../../../models/filterOptions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() filterOptions!:FilterOptions[];

  constructor(private readonly _router:Router) {}
  

  selectedValues: { [key: string]: any } = {};

  onSelectionChange(filterOption: FilterOptions, subOption: string, event?: any): void {
    if (filterOption.type === 'Radio') {
        this.selectedValues[filterOption.label] = subOption;
    } else if (filterOption.type === 'CheckBox') {
        if (!this.selectedValues[filterOption.label]) {
            this.selectedValues[filterOption.label] = [];
        }
        if (event.target.checked) {
            this.selectedValues[filterOption.label].push(subOption);
        } else {
            const index = this.selectedValues[filterOption.label].indexOf(subOption);
            if (index > -1) {
                this.selectedValues[filterOption.label].splice(index, 1);
            }
        }
    }
    this.updateQueryParams();
    console.log(this.selectedValues);
}

updateQueryParams(): void {
  const queryParams: { [key: string]: any } = {};
  
  // Process selected values for filters
  for (const key in this.selectedValues) {
      if (key === 'JobStatus') {
          // Handle job status filter
          queryParams['active'] = this.selectedValues[key] === 'Active jobs';
      } else if (key === 'Location') {
          // Handle location filter
          const selectedLocations = this.selectedValues[key];
          if (selectedLocations.includes('Remort')) {
              queryParams['remort'] = true;
          } else {
              queryParams['remort'] = false;
          }
      } else {
          // For other filters, handle as usual
          if (Array.isArray(this.selectedValues[key])) {
              queryParams[this.sanitizeKey(key)] = this.selectedValues[key].join(',');
          } else {
              queryParams[this.sanitizeKey(key)] = this.selectedValues[key];
          }
      }
  }
  
  // // Navigate with updated query parameters
  // this._router.navigate(['employer', 'jobs'], {
  //     queryParams: queryParams,
  //     queryParamsHandling: 'merge', // merge with existing query params
  // });
}


sanitizeKey(key: string): string {
  return key.replace(/\s+/g, '_'); // Replace spaces with underscores
}



}
