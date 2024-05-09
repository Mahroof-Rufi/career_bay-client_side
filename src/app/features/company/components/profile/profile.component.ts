import { Component, OnInit } from '@angular/core';
import { StateManagerService } from '../../../../services/state-manager.service';
import { Employer } from '../../../../store/employer-store/employer.model';
import { EmployerEditProfileModalService } from '../../../../services/employer-edit-profile-modal.service';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  employer!: Employer;

  dropdownOpen = false;
  size: TuiSizeL | TuiSizeS = 's';

  readonly burgers = ['Classic', 'Cheeseburger', 'Royal Cheeseburger'];
  readonly drinks = ['Cola', 'Tea', 'Coffee', 'Slurm'];

  constructor(
    private employerState:StateManagerService,
    private editProfileModal:EmployerEditProfileModalService
  ) {}

  ngOnInit(): void {
    const employerDataString = localStorage.getItem('employerData');
    
    if (employerDataString) {
      const employerData: Employer = JSON.parse(employerDataString);
      this.employerState.setEmployer(employerData)
    }
    
    this.employerState.getEmployer().subscribe((data) => {
      this.employer = data
      console.log(this.employer);
    })
  }

  editProfile() {
    this.editProfileModal.openModal()
  }
}
