import { Component, Input } from '@angular/core';
import { User, education } from '../../../../../user-store/user.model';
import { UserProfileEditModalService } from '../../../../../services/user-profile-edit-modal.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-user-profile-education-col',
  templateUrl: './user-profile-education-col.component.html',
  styleUrl: './user-profile-education-col.component.scss'
})
export class UserProfileEducationColComponent {
  @Input() education!:education;

  constructor(
    private _profileEditModal:UserProfileEditModalService,
    private _userStore: Store<{ user:User }>
  ) {}

  openEditEducation(education_id:string | undefined) {
    if (education_id) {
      this._profileEditModal.openUserEducationEditModal(education_id)
    }
  }

  deleteEducation(education_id:string | undefined) {
    if (education_id) {
      this._profileEditModal.openDeleteEducationModal(education_id)
    }
  } 

}
