import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Job, userStateModel } from '../../user-store/user.model';
import { loadSavedJobs } from '../../user-store/user.actions';
import { getSavedJobs } from '../../user-store/user.selector';

@Component({
  selector: 'app-saved-jobs-and-posts',
  templateUrl: './saved-jobs-and-posts.component.html',
  styleUrls: ['./saved-jobs-and-posts.component.scss']
})
export class SavedJobsAndPostsComponent implements OnInit{

  savedJobs!:any[];

  constructor(
    private readonly _userStore: Store< {'user':userStateModel} >
  ) {}

  ngOnInit(): void {
    this._userStore.dispatch(loadSavedJobs())
    this._userStore.select(getSavedJobs).subscribe( data => this.savedJobs = data )
  }

  showJob: boolean = true;

  showJobs() {
    this.showJob = true;
  }

  showPosts() {
    this.showJob = false;
  }
}
