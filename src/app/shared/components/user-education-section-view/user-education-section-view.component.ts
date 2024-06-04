import { Component, Input } from '@angular/core';
import { education } from '../../../features/user/user-store/user.model';

@Component({
  selector: 'app-user-education-section-view',
  templateUrl: './user-education-section-view.component.html',
  styleUrl: './user-education-section-view.component.scss'
})
export class UserEducationSectionViewComponent {
  @Input() educations:education[] | undefined
  @Input() isUser!:boolean;
}
