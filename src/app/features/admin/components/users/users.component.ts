import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, adminStateModel } from '../../store/admin.model';
import { getUsersData } from '../../store/admin.selector';
import { loadUsers, userAction } from '../../store/admin.actions';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../../services/auth-api-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  users!:User[];

  constructor(
    private readonly _authService:AuthApiService,
    private readonly _adminStore:Store<{ admin:adminStateModel }>,
  ) {}

  ngOnInit(): void {
    this._adminStore.dispatch(loadUsers())
    this._authService.$adminTokenRefreshed.subscribe(res => this._adminStore.dispatch(loadUsers()))
    this._adminStore.select(getUsersData).subscribe((data) => {
      this.users = data      
    })
  }

  trackByFn(id: string): string {
    return id; 
  }  

  userAction(userId:string) {
    this._adminStore.dispatch(userAction({ user_id:userId }))
  }


}
