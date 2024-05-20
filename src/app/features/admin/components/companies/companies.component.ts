import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employer, adminStateModel } from '../../store/admin.model';
import { getCompaniesData } from '../../store/admin.selector';
import { companyAction } from '../../store/admin.actions';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit{

  companies!:Employer[];

  constructor(
    private adminStore:Store<{ admin:adminStateModel }>
  ) {}

  ngOnInit(): void {
    this.adminStore.select(getCompaniesData).subscribe((data) => {
      this.companies = data;
      console.log(this.companies);
      
    })
  }

  trackByFn(id: string): string {
    return id; 
  }  

  employerAction(emp_id:string) {
    this.adminStore.dispatch(companyAction({ emplyr_id:emp_id }))
  }

}
