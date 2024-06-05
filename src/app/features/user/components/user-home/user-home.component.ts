import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userStateModel } from '../../user-store/user.model';
import { loadPosts, loadUser, loadUserJobs } from '../../user-store/user.actions';
import { AuthApiService } from '../../../../services/auth-api-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent implements OnInit, OnDestroy{

  private _userRefreshTokenSubscription!:Subscription;

  constructor(
    private readonly _userStore:Store<{ user:{ 'user':userStateModel } }>,
    private readonly _authAPIs:AuthApiService
  ) {}

  ngOnInit(): void {
    this._userStore.dispatch(loadUser())
    this._userStore.dispatch(loadUserJobs())
    this._userStore.dispatch(loadPosts())

    this._userRefreshTokenSubscription = this._authAPIs.$userTokenRefreshed.subscribe({
      next : res => {
        this._userStore.dispatch(loadUser())
        this._userStore.dispatch(loadUserJobs())
        this._userStore.dispatch(loadPosts())
      }
    })
    
  }

  ngOnDestroy(): void {
    this._userRefreshTokenSubscription?.unsubscribe()
  }

}
