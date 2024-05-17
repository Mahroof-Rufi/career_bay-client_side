import { Component, Input } from '@angular/core';
import { education } from '../../../../store/user-store/user.model';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-profile-education-col',
  templateUrl: './user-profile-education-col.component.html',
  styleUrl: './user-profile-education-col.component.scss'
})
export class UserProfileEducationColComponent {
  @Input() education!:education;

  constructor(
    private profileEditService:UserProfileEditModalService
  ) {}

  openEditEducation(edct_id:string | undefined) {
    this.profileEditService.openUserEducationEditModal(edct_id)
  }

}
