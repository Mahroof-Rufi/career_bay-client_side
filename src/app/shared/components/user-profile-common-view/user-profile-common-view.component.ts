import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { adminStateModel } from '../../../features/admin/store/admin.model';
import { getUserById } from '../../../features/admin/store/admin.selector';
import { User } from '../../../store/user-store/user.model';

@Component({
  selector: 'app-user-profile-common-view',
  templateUrl: './user-profile-common-view.component.html',
  styleUrl: './user-profile-common-view.component.scss'
})
export class UserProfileCommonViewComponent implements OnInit{

  userId!:string | null;
  userData:User | undefined;

  constructor(
    private activatedRoute:ActivatedRoute,
    private adminStore:Store<{ admin:adminStateModel }>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.userId = res.get('id')
        if (this.userId) {
          this.adminStore.select(getUserById(this.userId)).subscribe( user => {
            this.userData = user
            console.log(this.userId);
            console.log(this.userData);
            
          })
        }
    })
  }

}
