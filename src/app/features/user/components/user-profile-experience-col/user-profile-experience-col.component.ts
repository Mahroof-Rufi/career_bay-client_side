import { Component, Input } from '@angular/core';
import { experience } from '../../../../store/user-store/user.model';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-profile-experience-col',
  templateUrl: './user-profile-experience-col.component.html',
  styleUrl: './user-profile-experience-col.component.scss'
})
export class UserProfileExperienceColComponent {
  @Input() experience!:experience;

  constructor(
    private profileEditService:UserProfileEditModalService
  ) {}

  openEditExperience(exp_id:string | undefined) {
    exp_id ? this.profileEditService.openUserexperienceEditModal(exp_id) : this.profileEditService.openUserexperienceEditModal()
  }

  deleteExperience(exp_id:string | undefined) {
    this.profileEditService.openDeleteExperienceModal(exp_id)
  }
}
