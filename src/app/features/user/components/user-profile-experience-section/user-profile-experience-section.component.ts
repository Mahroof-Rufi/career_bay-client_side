import { Component, Input } from '@angular/core';
import { experience } from '../../../../store/user-store/user.model';

@Component({
  selector: 'app-user-profile-experience-section',
  templateUrl: './user-profile-experience-section.component.html',
  styleUrl: './user-profile-experience-section.component.scss'
})
export class UserProfileExperienceSectionComponent {
  @Input() experiences: experience[] | undefined

}
