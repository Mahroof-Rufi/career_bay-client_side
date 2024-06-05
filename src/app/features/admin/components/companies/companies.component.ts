import { AfterViewInit, Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Employer, adminStateModel } from '../../store/admin.model';
import { getCompaniesData } from '../../store/admin.selector';
import { employerAction, loadEmployers } from '../../store/admin.actions';
import { AuthApiService } from '../../../../services/auth-api-service.service';
import { ActivatedRoute } from '@angular/router';
import { FilterOptions } from '../../../../models/filterOptions';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit, AfterViewInit, OnDestroy{
  @Output() currentPageNo:number = 1;
  @Output() maxItemPerPage:number = 10;
  @Output() totalEmployerProfile!:number;

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
      label: 'company type',
      subOptions: [
        { label: 'IT services', key: 'industry', value: 'IT Services' },
        { label: 'consulting', key: 'industry', value: 'Consulting' },
        { label: 'manufacturing', key: 'industry', value: 'Manufacturing' },
        { label: 'healthcare', key: 'industry', value: 'Healthcare' }
      ],
      type: 'CheckBox'
    },
    {
      label: 'active / blocked',
      subOptions: [
        { label: 'Active employers', key: 'active', value: 'true' },
        { label: 'Blocked employers', key: 'active', value: 'false' },
      ],
      type: 'Radio'
    }
  ];

  companies!:Employer[];

  queryParamMapSubscription!:Subscription;
  adminTokenRefreshedSubscription!:Subscription;

  constructor(
    private readonly _authService:AuthApiService,
    private readonly _activatedRoute:ActivatedRoute,
    private readonly _adminStore:Store<{ admin:adminStateModel }>
  ) {}

  ngOnInit(): void {
    this.queryParamMapSubscription = this._activatedRoute.queryParamMap.subscribe({

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
        this._adminStore.dispatch(loadEmployers({ pageNo:this.currentPageNo,queries:filterQueryString }))
      }
    })
    
    this.adminTokenRefreshedSubscription = this._authService.$adminTokenRefreshed.subscribe(res => this._adminStore.dispatch(loadEmployers({ pageNo:this.currentPageNo })))
    this._adminStore.select(getCompaniesData).subscribe((data) => {
      this.companies = data.employers;
      this.totalEmployerProfile = data.totalEmployersCount
    })
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  trackByFn(id: string): string {
    return id; 
  }  

  employerAction(emp_id:string) {
    this._adminStore.dispatch(employerAction({ employer_id:emp_id }))
  }

  private constructQueryString(params: { [key: string]: string[] }): string {
    const queryStrings = Object.keys(params).map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`;
    });
    return queryStrings.join('&');
  }

  ngOnDestroy(): void {
    this.queryParamMapSubscription?.unsubscribe()
    this.adminTokenRefreshedSubscription?.unsubscribe()
  }

}
