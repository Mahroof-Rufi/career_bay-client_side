import { Component, Input } from '@angular/core';
import { experience } from '../../../../user-store/user.model';
import { UserProfileEditModalService } from '../../../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-profile-experience-section',
  templateUrl: './user-profile-experience-section.component.html',
  styleUrl: './user-profile-experience-section.component.scss'
})
export class UserProfileExperienceSectionComponent {
  @Input() experiences: experience[] | undefined

  constructor(
    private readonly _profileEditModal:UserProfileEditModalService
  ) {}

  openAddExperience() {
    this._profileEditModal.openUserExperienceEditModal()
  }
}
