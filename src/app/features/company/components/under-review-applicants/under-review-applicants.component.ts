import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { User } from '../../../user/user-store/user.model';
import { getApplicants } from '../../store/employer.selector';
import { AppliedUsers } from '../../store/employer.model';
import { ApplicationsConfirmationModalService } from '../../services/applications-confirmation-modal.service';

@Component({
  selector: 'app-under-review-applicants',
  templateUrl: './under-review-applicants.component.html',
  styleUrl: './under-review-applicants.component.scss'
})
export class UnderReviewApplicantsComponent implements AfterViewInit, OnInit{

  routeQuery:string | null = 'under-review' ;
  options:string[] = ['under-review', 'under-interview', 'finalists', 'on-hold', 'hired'];
  filteredOptions:string[] = ['under-interview', 'finalists', 'on-hold', 'hired'];
  applicants!:AppliedUsers
  filteredApplicants!:any[]
  job_id!:string | null;

  constructor(
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _router:Router,
    private readonly _confirmationService:ApplicationsConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.job_id = this._activatedRoute.snapshot.paramMap.get('job_id')
    this._activatedRoute.queryParamMap.subscribe((values) => {

      if (values.get('applicants')) {
        this.routeQuery = values.get('applicants')
        this.filterAppliedUsersByStatus(this.routeQuery)
        this.filterOptions();
      }
      
    })

    this._userStore.select(getApplicants).subscribe((data) => {
      this.applicants = data  
      this.filterAppliedUsersByStatus(this.routeQuery)
    } )
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }

  filterAppliedUsersByStatus(status: string | null): void {
    this.filteredApplicants = this.applicants.appliedUsers.filter((user:any) => user.status === status);
  }

  trackByFn(id: string): string {
    return id; 
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

  filterOptions(): void {    
    this.filteredOptions = this.options.filter(option => option !== this.routeQuery);
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
  
}
