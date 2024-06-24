import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Employer } from '../../../store/employer.model';
import { EmployerEditProfileModalService } from '../../../services/employer-edit-profile-modal.service';
import { Store } from '@ngrx/store';
import { getEmployerData } from '../../../store/employer.selector';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy{

  employer!: Employer;

  private _employerStoreSubscription!:Subscription;

  constructor(
    private readonly _editProfileModal:EmployerEditProfileModalService,
    private readonly _employerStore:Store<{ employer:Employer }>,
    private readonly _router:Router
  ) {}

  ngOnInit(): void {
    this._employerStoreSubscription = this._employerStore.select(getEmployerData).subscribe((res) => this.employer = res)
  }

  ngAfterViewInit(): void {
    initFlowbite()
  }

  editProfile() {
    this._editProfileModal.openModal()
  }

  logOutEmployer() {
    localStorage.removeItem('employerAccessToken')
    localStorage.removeItem('employerRefreshToken')
    this._router.navigateByUrl('/home')
  }

  ngOnDestroy(): void {
    this._employerStoreSubscription?.unsubscribe()
  }
}
