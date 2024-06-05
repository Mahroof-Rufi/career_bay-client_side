import { AfterViewInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { User, userStateModel } from '../../user-store/user.model';
import { UserAPIServiceService } from '../../services/user-api-service.service';
import { EmployerApiServiceService } from '../../../company/services/employer-api-service.service';
import { Store } from '@ngrx/store';
import { loadEmployersSuccess, loadUsersSuccess } from '../../user-store/user.actions';
import { getEmployers, getUsers } from '../../user-store/user.selector';
import { Employer } from '../../../company/store/employer.model';
import { FilterOptions } from '../../../../models/filterOptions';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrl: './networks.component.scss'
})
export class NetworksComponent implements OnInit, AfterViewInit, OnDestroy{
  @Output() currentPageNo:number = 1;
  @Output() maxItemPerPage:number = 12;
  @Output() totalUserProfile!:number;
  @Output() totalEmployerProfile!:number;
  @Output() users!: User[];
  @Output() employers!: Employer[];

  @Output() filterOptions: FilterOptions[] = [
    {
      label: 'profile type',
      subOptions: [
        { label: 'users', key: 'profileType', value: 'users' },
        { label: 'companies', key: 'profileType', value: 'companies' }
      ],
      type: 'Radio'
    },
    {
      label: 'sort by name',
      subOptions: [
        { label: 'A-Z', key: 'sort', value: 'a-z' },
        { label: 'Z-A', key: 'sort', value: 'z-a' }
      ],
      type: 'Radio'
    },
    {
      label: 'role/position',
      subOptions: [
        { label: 'developer', key: 'jobTitle', value: 'Developer' },
        { label: 'designer', key: 'jobTitle', value: 'Designer' },
        { label: 'manager', key: 'jobTitle', value: 'Manager' },
        { label: 'consultant', key: 'jobTitle', value: 'Consultant' }
      ],
      type: 'CheckBox'
    },
    {
      label: 'company type',
      subOptions: [
        { label: 'IT services', key: 'industry', value: 'IT Services' },
        { label: 'consulting', key: 'industry', value: 'Consulting' },
        { label: 'manufacturing', key: 'industry', value: 'Manufacturing' },
        { label: 'healthcare', key: 'industry', value: 'Healthcare' }
      ],
      type: 'CheckBox'
    },
  ];

  profileType!:'users' | 'companies' | null

  private _queryParamsSubscription!:Subscription;
  private _userAPIsSubscription!:Subscription;
  private _userStoreSubscription!:Subscription;

  constructor(
    private readonly _userAPIs: UserAPIServiceService,
    private readonly _employerAPIs: EmployerApiServiceService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _userStore: Store<{ 'user': userStateModel }>
  ) { }

  ngOnInit(): void {
    this._queryParamsSubscription = this._activatedRoute.queryParamMap.subscribe({
      next: queries => {

        const query = queries.get('profileType')
        if (query && query == 'users' || query == 'companies') {
          this.profileType = query
        } else {
          this.profileType = null
        }

        const pageNo = queries.get('page')
        if (pageNo) {
          this.currentPageNo = parseInt(pageNo)
        }

        const userQueryParams: any = {};
        const employerQueryParams: any = {};

        queries.keys.forEach(key => {
          if (key !== 'page' && key !== 'profileType') {
            if (key !== 'industry') {
              userQueryParams[key] = queries.getAll(key);
            }
            if (key !== 'jobTitle') {
              employerQueryParams[key] = queries.getAll(key);
            }
          }
        });

        const filterUserQueryString = this.constructQueryString(userQueryParams);
        const filterEmployerQueryString = this.constructQueryString(employerQueryParams);        
      
        console.log(this.profileType);
        
        this._userAPIsSubscription = this._userAPIs.fetchUsers(this.currentPageNo, filterUserQueryString).subscribe({
          next: response => {
            this._userStore.dispatch(loadUsersSuccess({ users: response.users }))
            this.totalUserProfile = response.totalNoOfUsers
          },
    
          error: err => {
            console.log(err);
          }
        })
    
        this._userAPIsSubscription = this._userAPIs.fetchEmployersData(this.currentPageNo, filterEmployerQueryString).subscribe({
          next: response => {
            console.log(response.employers);
            this._userStore.dispatch(loadEmployersSuccess({ employers: response.employers }))
            this.totalEmployerProfile = response.totalEmployersCount
          },
    
          error: err => {
            console.log(err.message);
          }
        })
      }
    })

    this._userStoreSubscription = this._userStore.select(getUsers).subscribe({
      next: response => {
        console.log('usr',response);
        
        this.users = response
      }
    })

    this._userAPIsSubscription = this._userStore.select(getEmployers).subscribe({
      next: response => {
        console.log('emp',response);
        
        this.employers = response
      }
    })
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  private constructQueryString(params: { [key: string]: string[] }): string {
    const queryStrings = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
    });
    return queryStrings.join('&');
  }

  ngOnDestroy(): void {
    this._queryParamsSubscription?.unsubscribe()
    this._userAPIsSubscription?.unsubscribe()
    this._userStoreSubscription?.unsubscribe()
  }

}
