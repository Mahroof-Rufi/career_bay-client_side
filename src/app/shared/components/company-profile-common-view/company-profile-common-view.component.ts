import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employer, adminStateModel } from '../../../features/admin/store/admin.model';
import { getEmployerById } from '../../../features/admin/store/admin.selector';
import { EmployerApiServiceService } from '../../../features/company/services/employer-api-service.service';
import { UserAPIServiceService } from '../../../features/user/services/user-api-service.service';

@Component({
  selector: 'app-company-profile-common-view',
  templateUrl: './company-profile-common-view.component.html',
  styleUrl: './company-profile-common-view.component.scss'
})
export class CompanyProfileCommonViewComponent implements OnInit{

  employer_id!:string | null;
  employerData:Employer | undefined;

  constructor(
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _adminStore:Store<{ admin:adminStateModel }>,
    private readonly _userAPIs:UserAPIServiceService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe( params => {
      this.employer_id = params.get('id')

      if (this.employer_id) {
        this._userAPIs.fetchEmployerProfileById(this.employer_id).subscribe({
          next: response => {
            this.employerData = response.employerData
          }
        })
      }
    })
  }

}
