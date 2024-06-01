import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { User, userStateModel } from '../../user-store/user.model';
import { UserAPIServiceService } from '../../services/user-api-service.service';
import { EmployerApiServiceService } from '../../../company/services/employer-api-service.service';
import { Store } from '@ngrx/store';
import { loadEmployersSuccess, loadUsersSuccess } from '../../user-store/user.actions';
import { getEmployers, getUsers } from '../../user-store/user.selector';
import { Employer } from '../../../company/store/employer.model';
import { FilterOptions } from '../../../../models/filterOptions';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrl: './networks.component.scss'
})
export class NetworksComponent implements OnInit, AfterViewInit{
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
        { label: 'A-Z', key: 'sort', value: 'ascending' },
        { label: 'Z-A', key: 'sort', value: 'descending' }
      ],
      type: 'Radio'
    },
    {
      label: 'role/position',
      subOptions: [
        { label: 'developer', key: 'role', value: 'Developer' },
        { label: 'designer', key: 'role', value: 'Designer' },
        { label: 'manager', key: 'role', value: 'Manager' },
        { label: 'consultant', key: 'role', value: 'Consultant' }
      ],
      type: 'CheckBox'
    },
    {
      label: 'company type',
      subOptions: [
        { label: 'IT services', key: 'companyType', value: 'IT Services' },
        { label: 'consulting', key: 'companyType', value: 'Consulting' },
        { label: 'manufacturing', key: 'companyType', value: 'Manufacturing' },
        { label: 'healthcare', key: 'companyType', value: 'Healthcare' }
      ],
      type: 'CheckBox'
    },
  ];


  constructor(
    private readonly _userAPIs: UserAPIServiceService,
    private readonly _employerAPIs: EmployerApiServiceService,
    private readonly _userStore: Store<{ 'user': userStateModel }>
  ) { }

  ngOnInit(): void {
    this._userAPIs.fetchUsers().subscribe({
      next: response => {
        this._userStore.dispatch(loadUsersSuccess({ users: response.users }))
      },

      error: err => {
        console.log(err);
      }
    })

    this._userAPIs.fetchEmployersData().subscribe({
      next: response => {
        console.log(response.employers);
        this._userStore.dispatch(loadEmployersSuccess({ employers: response.employers }))

      },

      error: err => {
        console.log(err.message);
      }
    })

    this._userStore.select(getUsers).subscribe({
      next: response => this.users = response
    })

    this._userStore.select(getEmployers).subscribe({
      next: response => this.employers = response
    })
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

}
