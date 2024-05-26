import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { commonAPIService } from '../../../services/common-api-service.service';
import { User } from '../../../features/user/user-store/user.model';
import { Store } from '@ngrx/store';
import { loadUserJobsSuccess } from '../../../features/user/user-store/user.actions';
import { Employer } from '../../../features/company/store/employer.model';
import { loadEmployerJobsSuccess, loadEmployerPostsSuccess as loadEmployerPostsSuccess } from '../../../features/company/store/employer.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  @Input() searchType!: 'jobs' | 'posts' | 'users' | 'companyJobs' | 'companyPosts'
  
  searchInput = new FormControl();

  constructor(
    private readonly _commonAPIs:commonAPIService,
    private readonly _userStore:Store<{ user:User }>,
    private readonly _employerStore:Store<{ employer:Employer }>
  ) {}

  ngOnInit(): void {    
    this.searchInput.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(query => this._commonAPIs.Search(query, this.searchType))).subscribe({
        next: response => {
          switch (this.searchType) {
            case 'jobs':
              this._userStore.dispatch(loadUserJobsSuccess({ jobs:response.data }));
              break;
            case 'companyJobs':
              this._employerStore.dispatch(loadEmployerJobsSuccess({ jobs:response.jobs }))
              break;
            case 'companyPosts':
              if (this.searchInput.value) {
                this._employerStore.dispatch(loadEmployerPostsSuccess({ posts:response.posts[0] }))
              } else {
                this._employerStore.dispatch(loadEmployerPostsSuccess({ posts:response.posts }))
              }
            // case 'posts':
            //   this.store.dispatch(PostActions.searchSuccess({ results }));
            //   break;
            // case 'users':
            //   this.store.dispatch(UserActions.searchSuccess({ results }));
            //   break;
          }
        },

        error: err => {
          console.error(err);          
        }
      })


  }

}
