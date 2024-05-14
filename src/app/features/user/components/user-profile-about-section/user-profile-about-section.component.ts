import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-about-section',
  templateUrl: './user-profile-about-section.component.html',
  styleUrl: './user-profile-about-section.component.scss'
})
export class UserProfileAboutSectionComponent {
  @Input() skills:string[] | undefined;

}
