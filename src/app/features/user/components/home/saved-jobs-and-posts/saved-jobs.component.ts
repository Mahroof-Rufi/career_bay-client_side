import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Job, Post, userStateModel } from '../../../user-store/user.model';
import { loadSavedJobs, loadSavedPosts } from '../../../user-store/user.actions';
import { getSavedJobs, getSavedPosts } from '../../../user-store/user.selector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-saved-jobs-and-posts',
  templateUrl: './saved-jobs-and-posts.component.html',
  styleUrls: ['./saved-jobs-and-posts.component.scss']
})
export class SavedJobsAndPostsComponent implements OnInit, OnDestroy{

  savedJobs$:Observable<any[]> = this._userStore.select(getSavedJobs);
  savedPosts$:Observable<any> = this._userStore.select(getSavedPosts);

  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _userStore: Store< {'user':userStateModel} >
  ) {}

  ngOnInit(): void {
    this._userStore.dispatch(loadSavedJobs())
    this._userStore.dispatch(loadSavedPosts())
    // this._userStoreSubscription = this._userStore.select(getSavedJobs).subscribe( data => this.savedJobs = data )
  }

  showJob: boolean = true;

  showJobs() {
    this.showJob = true;
  }

  showPosts() {
    this.showJob = false;
  }

  ngOnDestroy(): void {
    this._userStoreSubscription?.unsubscribe()
  }
}
