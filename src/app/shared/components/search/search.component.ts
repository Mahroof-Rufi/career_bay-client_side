import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { commonAPIService } from '../../../services/common-api-service.service';
import { User } from '../../../features/user/user-store/user.model';
import { Store } from '@ngrx/store';
import { loadUserJobsSuccess } from '../../../features/user/user-store/user.actions';
import { Employer } from '../../../features/company/store/employer.model';
import { loadEmployerJobsSuccess, loadEmployerPostsSuccess as loadEmployerPostsSuccess } from '../../../features/company/store/employer.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  @Input() searchType!: 'jobs' | 'posts' | 'users' | 'companyJobs' | 'companyPosts'
  
  searchInput = new FormControl();

  constructor(
    private readonly _router:Router,
  ) {}

  ngOnInit(): void {    
    this.searchInput.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((query: string) => {
        const queryParams = { search: query };
        return this._router.navigate([], {
          queryParams: queryParams,
          queryParamsHandling: 'merge',
        });
      })
    ).subscribe();
  }

}
