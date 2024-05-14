import { Component, OnInit } from '@angular/core';
import { Employer } from '../../../../store/employer-store/employer.model';
import { EmployerEditProfileModalService } from '../../../../services/employer-edit-profile-modal.service';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { getEmployerData } from '../../../../store/employer-store/employer.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  employer!: Employer;

  constructor(
    private editProfileModal:EmployerEditProfileModalService,
    private employerStore:Store<{ employer:Employer }>,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.employerStore.select(getEmployerData).subscribe((res) => {
      this.employer = res
    })
  }

  editProfile() {
    this.editProfileModal.openModal()
  }

  logOutEmployer() {
    localStorage.removeItem('employerToken')
    this.router.navigateByUrl('/home')
  }
}
