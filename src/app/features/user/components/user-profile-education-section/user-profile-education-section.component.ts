import { Component, Input } from '@angular/core';
import { education } from '../../user-store/user.model';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-profile-education-section',
  templateUrl: './user-profile-education-section.component.html',
  styleUrl: './user-profile-education-section.component.scss'
})
export class UserProfileEducationSectionComponent {
  @Input() educations:education[] | undefined

  constructor(
    private readonly _profileEditModal:UserProfileEditModalService
  ) {}

  openEditEducation() {
    this._profileEditModal.openUserEducationEditModal()
  }

}
