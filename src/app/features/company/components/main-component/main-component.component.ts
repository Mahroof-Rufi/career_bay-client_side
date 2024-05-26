import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmployerState } from '../../store/employer.model';
import { loadEmployer, loadEmployerJobs } from '../../store/employer.actions';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss'
})
export class MainComponentComponent implements OnInit{

  constructor(
    private readonly _employerStore:Store<{ 'employer':EmployerState }>
  ) {}

  ngOnInit(): void {
    this._employerStore.dispatch(loadEmployer())
  }

}
