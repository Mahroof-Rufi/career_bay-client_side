import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { adminStateModel } from '../../../features/admin/store/admin.model';
import { getUserById } from '../../../features/admin/store/admin.selector';
import { User } from '../../../features/user/user-store/user.model';
import { UserAPIServiceService } from '../../../features/user/services/user-api-service.service';

@Component({
  selector: 'app-user-profile-common-view',
  templateUrl: './user-profile-common-view.component.html',
  styleUrl: './user-profile-common-view.component.scss'
})
export class UserProfileCommonViewComponent implements OnInit{

  userId!:string | null;
  userData:User | undefined;
  viewFrom!:'fromUserSide' | 'fromAdminSide'

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private adminStore:Store<{ admin:adminStateModel }>,
    private userAPIs:UserAPIServiceService
  ) {}

  ngOnInit(): void {    
    this.activatedRoute.paramMap.subscribe((res) => {
      this.userId = res.get('id')
        if (this.userId) {
          this.userAPIs.fetchUserProfileById(this.userId).subscribe({
            next: response => {
              this.userData = response.userData
            }
          })
        }
    })
  }

}
