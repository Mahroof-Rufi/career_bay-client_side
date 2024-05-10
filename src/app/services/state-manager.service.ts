import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employer, Job } from '../store/employer-store/employer.model';
import { getEmployerData, getJobById } from '../store/employer-store/employer.selector';
import { loadEmployer, loadJobs, updateJob } from '../store/employer-store/employer.actions';

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {

  constructor(
    private employerState: Store<{employer:Employer}>
  ) { }

  setEmployer(data:Employer) {
    this.employerState.dispatch(loadEmployer({employerData:data}))
  }

  getEmployer() {
    return this.employerState.select(getEmployerData)
  }

  setJobs(jobs:Job[]) {
    this.employerState.dispatch(loadJobs({jobs:jobs}))
  }

  getJobBYId(jobId:string) {
    return this.employerState.select(getJobById(jobId))
  }

  updateJobById(job_id:string, newData:Job) {
    return this.employerState.dispatch(updateJob({ id:job_id, updatedJob:newData }))
  }
}
