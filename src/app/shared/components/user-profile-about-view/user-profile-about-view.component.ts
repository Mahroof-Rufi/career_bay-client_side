import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-about-view',
  templateUrl: './user-profile-about-view.component.html',
  styleUrl: './user-profile-about-view.component.scss'
})
export class UserProfileAboutViewComponent {
  @Input() about:string | undefined;
  @Input() isUser!:boolean;
}
