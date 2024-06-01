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

  queryParams: { [key: string]: string } = {};

  constructor(private readonly _router:Router) {}

  generateQueryParameter(key: string, value: string, type:'RadioButton'|'CheckBox') {

    if (this.queryParams.hasOwnProperty(key) && type == 'CheckBox') {
        if (this.queryParams.hasOwnProperty(key)) {
            const values = this.queryParams[key].split(',');
            const index = values.indexOf(value);
    
            if (index !== -1) {
                values.splice(index, 1);
    
                if (values.length === 0) {
                    delete this.queryParams[key];
                } else {
                    this.queryParams[key] = values.join(',');
                }
            } else {
                this.queryParams[key] += `,${value}`;
            }
        } else {
            this.queryParams[key] = value;
        }
    } else {
      this.queryParams[key] = value;
    }

    const queryParamsString = Object.keys(this.queryParams).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(this.queryParams[k])}`).join('&');
    const url = queryParamsString ? `/employer/jobs?${queryParamsString}` : '/employer/jobs';

    this._router.navigateByUrl(url);
  }
}

