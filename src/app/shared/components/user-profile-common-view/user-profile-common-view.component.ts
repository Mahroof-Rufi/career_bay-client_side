import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { adminStateModel } from '../../../features/admin/store/admin.model';
import { getUserById } from '../../../features/admin/store/admin.selector';
import { User } from '../../../features/user/user-store/user.model';
import { UserAPIServiceService } from '../../../features/user/services/user-api-service.service';
import { AdminApiServiceService } from '../../../features/admin/services/admin-api-service.service';

@Component({
  selector: 'app-user-profile-common-view',
  templateUrl: './user-profile-common-view.component.html',
  styleUrl: './user-profile-common-view.component.scss'
})
export class UserProfileCommonViewComponent implements OnInit{

  userId!:string | null;
  userData:User | undefined;
  isUser!:boolean;

  constructor(
    private activatedRoute:ActivatedRoute,
    private _router:Router,
    private adminStore:Store<{ admin:adminStateModel }>,
    private userAPIs:UserAPIServiceService,
    private _adminAPIs:AdminApiServiceService
  ) {}

  ngOnInit(): void {    
    this.checkUrl()
    this.activatedRoute.paramMap.subscribe((res) => {
      this.userId = res.get('id')
      console.log('admin',this.userId);
      
        if (this.userId) {
          if(this.isUser) {
            this.userAPIs.fetchUserProfileById(this.userId).subscribe({
              next: response => {
                this.userData = response.userData
              }
            })
          } else {
            this._adminAPIs.adminFetchUserById(this.userId).subscribe({
              next: response => this.userData = response.userData 
            })
          }
        }
    })
  }

  private checkUrl(): void {
    const urlSegments = this._router.url.split('/');    
    if (urlSegments.length >= 3) {
      const secondSegment = urlSegments[1];      
      this.isUser = secondSegment == 'user';
    }    
  }

}
