import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employer, adminStateModel } from '../../../features/admin/store/admin.model';
import { getEmployerById } from '../../../features/admin/store/admin.selector';

@Component({
  selector: 'app-company-profile-common-view',
  templateUrl: './company-profile-common-view.component.html',
  styleUrl: './company-profile-common-view.component.scss'
})
export class CompanyProfileCommonViewComponent implements OnInit{

  employer_id!:string | null;
  employerData:Employer | undefined;

  constructor(
    private activatedRoute:ActivatedRoute,
    private adminStore:Store<{ admin:adminStateModel }>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      this.employer_id = params.get('id')

      if (this.employer_id) {
        this.adminStore.select(getEmployerById(this.employer_id)).subscribe((data) => this.employerData = data)
      }
    })
  }

}
