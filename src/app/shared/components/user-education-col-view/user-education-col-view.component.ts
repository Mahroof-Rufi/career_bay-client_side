import { Component, Input } from '@angular/core';
import { education } from '../../../features/user/user-store/user.model';

@Component({
  selector: 'app-user-education-col-view',
  templateUrl: './user-education-col-view.component.html',
  styleUrl: './user-education-col-view.component.scss'
})
export class UserEducationColViewComponent {
  @Input() education:education | undefined
}
