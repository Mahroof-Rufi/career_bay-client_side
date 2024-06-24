import { Component, Input } from '@angular/core';
import { UserMainDetails } from '../../../../user-store/user.model';
import { UserProfileEditModalService } from '../../../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-profile-main-details',
  templateUrl: './user-profile-main-details.component.html',
  styleUrl: './user-profile-main-details.component.scss'
})
export class UserProfileMainDetailsComponent {
  @Input() userMainDetails!:UserMainDetails;

  constructor(
    private readonly _profileEditModal:UserProfileEditModalService
  ) {}

  openMainDetailsEdit() {
    this._profileEditModal.openUserMainDetailsModal()
  }

}
