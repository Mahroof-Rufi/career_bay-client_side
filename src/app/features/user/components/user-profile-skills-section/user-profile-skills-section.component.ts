import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-skills-section',
  templateUrl: './user-profile-skills-section.component.html',
  styleUrl: './user-profile-skills-section.component.scss'
})
export class UserProfileSkillsSectionComponent {
  @Input() skills:string[] | undefined

}
