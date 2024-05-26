import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../user/user-store/user.model';
import { getEmployerId } from '../store/employer.selector';
import { loadApplicants } from '../store/employer.actions';

export const loadJobApplicantsGuard: CanActivateFn = (route, state) => {

  let employer_id!:string | null;
  let jobId:string | null = route.paramMap.get('job_id')

  const userStore = inject(Store<{ user:User }>)
  userStore.select(getEmployerId).subscribe((id) => {
    employer_id = id
  
    if (jobId && employer_id) {
      
      userStore.dispatch(loadApplicants({ employer_id:employer_id, jobId:jobId }))
    }
  })
  
  return true;
};
