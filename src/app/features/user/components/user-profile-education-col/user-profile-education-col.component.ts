import { Component, Input } from '@angular/core';
import { User, education } from '../../../../store/user-store/user.model';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-profile-education-col',
  templateUrl: './user-profile-education-col.component.html',
  styleUrl: './user-profile-education-col.component.scss'
})
export class UserProfileEducationColComponent {
  @Input() education!:education;

  constructor(
    private profileEditService:UserProfileEditModalService,
    private userStore: Store<{ user:User }>
  ) {}

  openEditEducation(edct_id:string | undefined) {
    if (edct_id) {
      this.profileEditService.openUserEducationEditModal(edct_id)
    }
  }

  deleteEducation(edct_id:string | undefined) {
    if (edct_id) {
      this.profileEditService.openDeleteEducationModal(edct_id)
    }
  } 

}
