import { Component, Input } from '@angular/core';
import { education } from '../../../../store/user-store/user.model';

@Component({
  selector: 'app-user-profile-education-section',
  templateUrl: './user-profile-education-section.component.html',
  styleUrl: './user-profile-education-section.component.scss'
})
export class UserProfileEducationSectionComponent {
  @Input() educations:education[] | undefined

}
