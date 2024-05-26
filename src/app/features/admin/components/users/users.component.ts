import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, adminStateModel } from '../../store/admin.model';
import { getUsersData } from '../../store/admin.selector';
import { userAction } from '../../store/admin.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  users!:User[];

  constructor(
    private readonly adminStore:Store<{ admin:adminStateModel }>,
  ) {}

  ngOnInit(): void {
    this.adminStore.select(getUsersData).subscribe((data) => {
      this.users = data
      console.log(this.users);
      
    })
  }

  trackByFn(id: string): string {
    return id; 
  }  

  userAction(userId:string) {
    this.adminStore.dispatch(userAction({ user_id:userId }))
  }


}
