import { AfterViewInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, adminStateModel } from '../../store/admin.model';
import { getUsersData } from '../../store/admin.selector';
import { loadUsers, userAction } from '../../store/admin.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../../../../services/auth-api-service.service';
import { FilterOptions } from '../../../../models/filterOptions';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy{
  @Output() currentPageNo:number = 1;
  @Output() maxItemPerPage:number = 10;
  @Output() totalUserProfiles!:number;

  @Output() filterOptions: FilterOptions[] = [
    {
      label: 'sort by name',
      subOptions: [
        { label: 'A-Z', key: 'sort', value: 'a-z' },
        { label: 'Z-A', key: 'sort', value: 'z-a' }
      ],
      type: 'Radio'
    },
    {
      label: 'role / position',
      subOptions: [
        { label: 'developer', key: 'jobTitle', value: 'Developer' },
        { label: 'designer', key: 'jobTitle', value: 'Designer' },
        { label: 'manager', key: 'jobTitle', value: 'Manager' },
        { label: 'consultant', key: 'jobTitle', value: 'Consultant' }
      ],
      type: 'CheckBox'
    },
    {
      label: 'active / blocked',
      subOptions: [
        { label: 'Active users', key: 'isActive', value: 'true' },
        { label: 'Blocked users', key: 'isActive', value: 'false' },
      ],
      type: 'Radio'
    }
  ];

  users!:User[];

  queryParamSubscription!:Subscription;
  adminTokenRefreshedSubscription!:Subscription;

  constructor(
    private readonly _authService:AuthApiService,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _adminStore:Store<{ admin:adminStateModel }>,
  ) {}

  ngOnInit(): void {
    this.queryParamSubscription = this._activatedRoute.queryParamMap.subscribe({
      next: queries => {

        const pageNo = queries.get('page')
        if (pageNo) {
          this.currentPageNo = parseInt(pageNo)
        }

        const queryParams: any = {};
        queries.keys.forEach(key => {
          if (key !== 'page') {
            queryParams[key] = queries.getAll(key);
          }
        });

        const filterQueryString = this.constructQueryString(queryParams);
        

        this._adminStore.dispatch(loadUsers({ pageNo:this.currentPageNo, queries:filterQueryString }))
      }
    })

    this.adminTokenRefreshedSubscription = this._authService.$adminTokenRefreshed.subscribe(res => this._adminStore.dispatch(loadUsers({ pageNo:this.currentPageNo })))
    this._adminStore.select(getUsersData).subscribe((data) => {
      this.users = data.users 
      this.totalUserProfiles = data.totalUsersCount
    })
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  trackByFn(id: string): string {
    return id; 
  }  

  userAction(userId:string) {
    this._adminStore.dispatch(userAction({ user_id:userId }))
  }

  private constructQueryString(params: { [key: string]: string[] }): string {
    const queryStrings = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
    });
    return queryStrings.join('&');
  }

  ngOnDestroy(): void {
    this.queryParamSubscription?.unsubscribe()
    this.adminTokenRefreshedSubscription?.unsubscribe()
  }

}
