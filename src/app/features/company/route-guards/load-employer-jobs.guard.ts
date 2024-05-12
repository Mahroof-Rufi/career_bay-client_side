import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employer } from '../../../store/employer-store/employer.model';
import { loadEmployerJobs } from '../../../store/employer-store/employer.actions';

export const loadEmployerJobsGuard: CanActivateFn = (route, state) => {

  const employerStore = inject(Store<{ employer:Employer }>)
  employerStore.dispatch(loadEmployerJobs())
  console.log('dispatched');
  
  return true;
};
