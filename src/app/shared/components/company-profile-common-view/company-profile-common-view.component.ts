import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employer, adminStateModel } from '../../../features/admin/store/admin.model';
import { getEmployerById } from '../../../features/admin/store/admin.selector';
import { EmployerApiServiceService } from '../../../features/company/services/employer-api-service.service';
import { UserAPIServiceService } from '../../../features/user/services/user-api-service.service';
import { Job } from '../../../features/user/user-store/user.model';
import { JobsApiServiceService } from '../../services/jobs-api-service.service';
import { AdminApiServiceService } from '../../../features/admin/services/admin-api-service.service';

@Component({
  selector: 'app-company-profile-common-view',
  templateUrl: './company-profile-common-view.component.html',
  styleUrls: ['./company-profile-common-view.component.scss']
})
export class CompanyProfileCommonViewComponent implements OnInit {
  @Output() currentPageNo: number = 1;
  @Output() totalNoOfJobs!: number;
  @Output() maxItemsPerPage: number = 6;

  isUser!:boolean;
  employer_id!: string | null;
  employerData: Employer | undefined;
  employerJobs!: Job[];

  constructor(
    private readonly _router:Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _adminStore: Store<{ admin: adminStateModel }>,
    private readonly _userAPIs: UserAPIServiceService,
    private readonly _jobsAPIs: JobsApiServiceService,
    private readonly _adminAPIs: AdminApiServiceService
  ) {}

  ngOnInit(): void {
    this.checkUrl()
    this._activatedRoute.paramMap.subscribe(params => {
      this.employer_id = params.get('id');

      if(this.employer_id) {
        if (this.isUser) {
          this._userAPIs.fetchEmployerProfileById(this.employer_id).subscribe({
            next: response => {
              this.employerData = response.employerData;
            }
          });
        } else {
          this._adminAPIs.adminFetchEmployerById(this.employer_id).subscribe({
            next: response => this.employerData = response.employerData
          })
        }
      }
      
    });

    this._activatedRoute.queryParamMap.subscribe( queries => {
      const pageQuery = queries.get('page');
      if (pageQuery) {
        this.currentPageNo = parseInt(pageQuery);
      }      

             
      if (this.employer_id) {
        if (this.isUser) {
          this._jobsAPIs.companyFetchJobsById(this.employer_id, this.currentPageNo).subscribe({
            next: response => {
              this.employerJobs = response.employerJobs;
              this.totalNoOfJobs = response.totalNoOfJobs;
            }
          });
        }
      }
    })
  }

  private checkUrl(): void {
    const urlSegments = this._router.url.split('/');    
    if (urlSegments.length >= 3) {
      const secondSegment = urlSegments[1];      
      this.isUser = secondSegment == 'user';
    }    
  }
}