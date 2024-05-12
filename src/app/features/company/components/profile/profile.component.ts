import { Component, OnInit } from '@angular/core';
import { Employer } from '../../../../store/employer-store/employer.model';
import { EmployerEditProfileModalService } from '../../../../services/employer-edit-profile-modal.service';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { getEmployerData } from '../../../../store/employer-store/employer.selector';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  employer!: Employer;

  constructor(
    private editProfileModal:EmployerEditProfileModalService,
    private employerStore:Store<{ employer:Employer }>
  ) {}

  ngOnInit(): void {
    this.employerStore.select(getEmployerData).subscribe((res) => {
      this.employer = res
      console.log(this.employer);
      
    })
  }

  editProfile() {
    this.editProfileModal.openModal()
  }
}
