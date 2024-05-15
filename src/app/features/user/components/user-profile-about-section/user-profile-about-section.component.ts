import { Component, Input } from '@angular/core';
import { UserProfileEditModalService } from '../../services/user-profile-edit-modal.service';

@Component({
  selector: 'app-user-profile-about-section',
  templateUrl: './user-profile-about-section.component.html',
  styleUrl: './user-profile-about-section.component.scss'
})
export class UserProfileAboutSectionComponent {
  @Input() about:string | undefined;

  constructor(
    private userProfileEditService:UserProfileEditModalService
  ) {}

  openEditAbout() {
    this.userProfileEditService.openUseraboutEditModal()
  }
}
