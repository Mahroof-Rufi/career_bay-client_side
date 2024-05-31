import { Component, OnInit } from '@angular/core';
import { User } from '../../user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserData } from '../../user-store/user.selector';
import { Router } from '@angular/router';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  userData!:User;

  constructor(
    private readonly _userStore:Store<{ user:User }>,
    private readonly _router:Router,
    private readonly _profileEditModal:UserProfileEditModalService,
  ) {}

  ngOnInit(): void {
    this._userStore.select(getUserData).subscribe((res) => this.userData = res)
  }

  logout() {
    localStorage.removeItem('userAccessToken')
    localStorage.removeItem('userRefreshToken')
    this._router.navigateByUrl('/home')
  }

  changeEmail() {
    this._profileEditModal.openChangeEmailModal()
  }

}
