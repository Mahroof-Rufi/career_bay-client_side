import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employer, adminStateModel } from '../../store/admin.model';
import { getCompaniesData } from '../../store/admin.selector';
import { employerAction, loadEmployers } from '../../store/admin.actions';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit{

  companies!:Employer[];

  constructor(
    private readonly _adminStore:Store<{ admin:adminStateModel }>
  ) {}

  ngOnInit(): void {
    this._adminStore.dispatch(loadEmployers())
    this._adminStore.select(getCompaniesData).subscribe((data) => {
      this.companies = data;
    })
  }

  trackByFn(id: string): string {
    return id; 
  }  

  employerAction(emp_id:string) {
    this._adminStore.dispatch(employerAction({ employer_id:emp_id }))
  }

}
