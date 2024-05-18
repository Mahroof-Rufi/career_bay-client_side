import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { User } from '../../../../store/user-store/user.model';
import { getApplicants } from '../../../../store/employer-store/employer.selector';
import { AppliedUser, AppliedUsers } from '../../../../store/employer-store/employer.model';
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
    private activatedRoute:ActivatedRoute,
    private userStore:Store<{ user:User }>,
    private router:Router,
    private confirmationService:ApplicationsConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.job_id = this.activatedRoute.snapshot.paramMap.get('job_id')
    this.activatedRoute.queryParamMap.subscribe((values) => {

      if (values.get('applicants')) {
        this.routeQuery = values.get('applicants')
        this.filterAppliedUsersByStatus(this.routeQuery)
        this.filterOptions();
      }
      
    })

    this.userStore.select(getApplicants).subscribe((data) => {
      this.applicants = data  
      this.filterAppliedUsersByStatus(this.routeQuery)
      console.log(this.filteredOptions);
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

  navigateoptions(option:string) {
    switch (option) {
      case 'under-review':
        this.router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'under-review' }})
        break;
      case 'under-interview':
        this.router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'under-interview' }})
        break
      case 'finalists':
        this.router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'finalists' }})
        break
      case 'on-hold':
        this.router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'on-hold' }})
        break
      case 'hired':
        this.router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'hired' }})
        break
      default:
        this.router.navigate([`/employer/job/applicants/${this.job_id}`], {queryParams:{ applicants:'under-review' }})
        break;
    }
  }

  filterOptions(): void {    
    this.filteredOptions = this.options.filter(option => option !== this.routeQuery);
  }

  accept(user_id:string) {
    switch (this.routeQuery) {
      case 'under-review':
        this.confirmationService.openApplicationStatusChangeDialogue(this.job_id, user_id, 'under-interview')
        break;
      case 'under-interview':
        this.confirmationService.openApplicationStatusChangeDialogue(this.job_id, user_id, 'finalists')
        break;
      case 'finalists':
        this.confirmationService.openApplicationStatusChangeDialogue(this.job_id, user_id, 'on-hold')
        break;
      default:
        break;
    }
  }
  
}
