import { Component, OnInit, Output } from '@angular/core';
import { User, userStateModel } from '../../user-store/user.model';
import { UserAPIServiceService } from '../../services/user-api-service.service';
import { EmployerApiServiceService } from '../../../company/services/employer-api-service.service';
import { Store } from '@ngrx/store';
import { loadEmployersSuccess, loadUsersSuccess } from '../../user-store/user.actions';
import { getEmployers, getUsers } from '../../user-store/user.selector';
import { Employer } from '../../../company/store/employer.model';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrl: './networks.component.scss'
})
export class NetworksComponent implements OnInit{
  @Output() users!:User[];
  @Output() employers!:Employer[];

  constructor(
    private readonly _userAPIs:UserAPIServiceService,
    private readonly _employerAPIs:EmployerApiServiceService,
    private readonly _userStore:Store<{ 'user':userStateModel }>
  ) {}

  ngOnInit(): void {
    this._userAPIs.fetchUsers().subscribe({
      next: response => {
        this._userStore.dispatch(loadUsersSuccess({ users:response.users }))
      },

      error: err => {
        console.log(err);        
      }
    })

    this._userAPIs.fetchEmployersData().subscribe({
      next: response => {
        console.log(response.employers);
        this._userStore.dispatch(loadEmployersSuccess({ employers:response.employers }))
        
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


}
