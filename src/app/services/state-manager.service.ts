import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employer } from '../store/employer-store/employer.model';
import { getEmployerData } from '../store/employer-store/employer.selector';
import { loadEmployer } from '../store/employer-store/employer.actions';

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
}
