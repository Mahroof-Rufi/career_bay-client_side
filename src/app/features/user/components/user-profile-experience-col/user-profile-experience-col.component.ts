import { Component, Input } from '@angular/core';
import { experience } from '../../user-store/user.model';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-profile-experience-col',
  templateUrl: './user-profile-experience-col.component.html',
  styleUrl: './user-profile-experience-col.component.scss'
})
export class UserProfileExperienceColComponent {
  @Input() experience!:experience;

  constructor(
    private readonly _profileEditModal:UserProfileEditModalService
  ) {}

  openEditExperience(exp_id:string | undefined) {
    exp_id ? this._profileEditModal.openUserExperienceEditModal(exp_id) : this._profileEditModal.openUserExperienceEditModal()
  }

  deleteExperience(exp_id:string | undefined) {
    this._profileEditModal.openDeleteExperienceModal(exp_id)
  }
}
