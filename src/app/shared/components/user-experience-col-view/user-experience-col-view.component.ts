import { Component, Input } from '@angular/core';
import { experience } from '../../../features/user/user-store/user.model';

@Component({
  selector: 'app-user-experience-col-view',
  templateUrl: './user-experience-col-view.component.html',
  styleUrl: './user-experience-col-view.component.scss'
})
export class UserExperienceColViewComponent {
  @Input() experience:experience | undefined
}
