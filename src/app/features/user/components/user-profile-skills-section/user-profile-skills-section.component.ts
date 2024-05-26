import { Component, Input } from '@angular/core';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-profile-skills-section',
  templateUrl: './user-profile-skills-section.component.html',
  styleUrl: './user-profile-skills-section.component.scss'
})
export class UserProfileSkillsSectionComponent {
  @Input() skills:string[] | undefined

  constructor(
    private readonly _profileEditModal:UserProfileEditModalService
  ) {}

  openUserSkillsEdit() {
    this._profileEditModal.openUserSkillsEditModal()
  }

}
