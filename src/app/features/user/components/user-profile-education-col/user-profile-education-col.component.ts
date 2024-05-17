import { Component, Input } from '@angular/core';
import { education } from '../../../../store/user-store/user.model';

@Component({
  selector: 'app-user-profile-education-col',
  templateUrl: './user-profile-education-col.component.html',
  styleUrl: './user-profile-education-col.component.scss'
})
export class UserProfileEducationColComponent {
  @Input() education!:education;

}
