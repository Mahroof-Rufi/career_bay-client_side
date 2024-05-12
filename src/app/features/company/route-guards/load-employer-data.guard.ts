import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employer } from '../../../store/employer-store/employer.model';
import { loadEmployer } from '../../../store/employer-store/employer.actions';

export const loadEmployerDataGuard: CanActivateFn = (route, state) => {
  
  const employerState = inject(Store<{employer:Employer}>)
  employerState.dispatch(loadEmployer())
  console.log('dispatched');
  
  return true;
};
