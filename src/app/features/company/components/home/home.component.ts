import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EmployerState } from '../../store/employer.model';
import { loadEmployer, loadEmployerJobs } from '../../store/employer.actions';
import { AuthApiService } from '../../../../services/auth-api-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-component',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class MainComponentComponent implements OnInit, OnDestroy{

  private _employerRefreshTokenSubscription!:Subscription;
  isSidebarVisible = false;

  constructor(
    private readonly _authService:AuthApiService,
    private readonly _employerStore:Store<{ 'employer':EmployerState }>
  ) {}

  ngOnInit(): void {
    this._employerStore.dispatch(loadEmployer())
    this._employerRefreshTokenSubscription = this._authService.$employerTokenRefreshed.subscribe({
      next: response => {        
        this._employerStore.dispatch(loadEmployer())
      }
    })
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  ngOnDestroy(): void {
    this._employerRefreshTokenSubscription?.unsubscribe()
  }

}
