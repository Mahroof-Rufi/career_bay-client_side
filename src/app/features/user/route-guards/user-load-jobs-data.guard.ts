import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employer } from '../../../store/employer-store/employer.model';
import { loadJobs } from '../../../store/user-store/user.actions';

export const userLoadJobsDataGuard: CanActivateFn = (route, state) => {

  const employerStore = inject(Store<{ employer:Employer }>)
  employerStore.dispatch(loadJobs())
  console.log('dispatched');
  return true;
};
