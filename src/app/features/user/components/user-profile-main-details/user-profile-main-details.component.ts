import { Component, Input } from '@angular/core';
import { UserMainDetails } from '../../../../store/user-store/user.model';

@Component({
  selector: 'app-user-profile-main-details',
  templateUrl: './user-profile-main-details.component.html',
  styleUrl: './user-profile-main-details.component.scss'
})
export class UserProfileMainDetailsComponent {
  @Input() userMainDetails!:UserMainDetails;

}
