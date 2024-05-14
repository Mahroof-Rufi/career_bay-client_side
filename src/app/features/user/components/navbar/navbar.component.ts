import { Component, OnInit } from '@angular/core';
import { User } from '../../../../store/user-store/user.model';
import { Store } from '@ngrx/store';
import { getUserData } from '../../../../store/user-store/user.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  readonly waterplea = 'https://avatars.githubusercontent.com/u/11832552?v=4';
  userData!:User;

  constructor(
    private userStore:Store<{ user:User }>,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.userStore.select(getUserData).subscribe((res) => {
      this.userData = res
    })
  }

  logout() {
    localStorage.removeItem('userToken')
    this.router.navigateByUrl('/home')
  }

}
