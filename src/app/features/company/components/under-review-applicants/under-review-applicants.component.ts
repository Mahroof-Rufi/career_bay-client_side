import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { User } from '../../../user/user-store/user.model';
import { getApplicants } from '../../store/employer.selector';
import { AppliedUsers, EmployerState } from '../../store/employer.model';
import { ApplicationsConfirmationModalService } from '../../services/applications-confirmation-modal.service';
import { loadApplicants } from '../../store/employer.actions';
import { AuthApiService } from '../../../../services/auth-api-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-under-review-applicants',
  templateUrl: './under-review-applicants.component.html',
  styleUrl: './under-review-applicants.component.scss'
})
export class UnderReviewApplicantsComponent implements AfterViewInit, OnInit, OnDestroy{

  routeQuery:string | null = 'under-review' ;
  options:string[] = ['under-review', 'under-interview', 'finalists', 'on-hold', 'hired'];
  applicants!:AppliedUsers
  filteredApplicants!:any[]
  job_id!:string | null;

  private _queryParamsSubscription!:Subscription;
  private _employerRefreshTokenSubscription!:Subscription;
  private _employerStoreSubscription!:Subscription;

  constructor(
    private readonly _authService:AuthApiService,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _employerStore:Store<{ 'employer':EmployerState }>,
    private readonly _router:Router,
    private readonly _confirmationService:ApplicationsConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.job_id = this._activatedRoute.snapshot.paramMap.get('job_id')
    
    this._queryParamsSubscription = this._activatedRoute.queryParamMap.subscribe((values) => {

      if (this.job_id) {
        this._employerStore.dispatch(loadApplicants({ jobId: this.job_id }));
      }

      this._employerRefreshTokenSubscription = this._authService.$employerTokenRefreshed.subscribe({
        next: response => {
          if (this.job_id) {
            this._employerStore.dispatch(loadApplicants({ jobId: this.job_id }));
          }
        }
      })

      if (values.has('applicants')) {
        this.routeQuery = values.get('applicants');
        this.filterAppliedUsersByStatus(this.routeQuery);
      } else {
          this.routeQuery = 'under-review';
          this.filterAppliedUsersByStatus('under-review');
      }
      
    })

    this._employerStoreSubscription = this._employerStore.select(getApplicants).subscribe((data) => {
      this.applicants = data  
      this.filterAppliedUsersByStatus(this.routeQuery)
    } )
    
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  filterAppliedUsersByStatus(status: string | null): void {
    this.filteredApplicants = this.applicants?.appliedUsers.filter((user:any) => user.status === status && !user.rejected);
  }

  trackByFn(id: string): string {
    return id; 
  }  

  navigateToInbox(user_id:string) {
    this._router.navigate(['/employer/inbox', 'employer', user_id]);
  }

  navigateOptions(option:string) {
    switch (option) {
      case 'under-review':
        this._router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'under-review' }})
        break;
      case 'under-interview':
        this._router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'under-interview' }})
        break
      case 'finalists':
        this._router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'finalists' }})
        break
      case 'on-hold':
        this._router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'on-hold' }})
        break
      case 'hired':
        this._router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'hired' }})
        break
      default:
        this._router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'under-review' }})
        break;
    }
  }


  accept(user_id:string) {
    switch (this.routeQuery) {
      case 'under-review':
        this._confirmationService.openApplicationStatusChangeDialogue(this.job_id, user_id, 'under-interview')
        break;
      case 'under-interview':
        this._confirmationService.openApplicationStatusChangeDialogue(this.job_id, user_id, 'finalists')
        break;
      case 'finalists':
        this._confirmationService.openApplicationStatusChangeDialogue(this.job_id, user_id, 'on-hold')
        break;
    }
  }

  reject(user_id:string) {
    this._confirmationService.openApplicationRejectDialogue(this.job_id, user_id, 'reject')
  }

  ngOnDestroy(): void {
    this._employerRefreshTokenSubscription?.unsubscribe()
    this._employerStoreSubscription?.unsubscribe()
    this._queryParamsSubscription?.unsubscribe()
  }
  
}
