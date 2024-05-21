import { Component, Input } from '@angular/core';
import { experience } from '../../../features/admin/store/admin.model';

@Component({
  selector: 'app-user-experience-section-view',
  templateUrl: './user-experience-section-view.component.html',
  styleUrl: './user-experience-section-view.component.scss'
})
export class UserExperienceSectionViewComponent {
  @Input() experiences:experience[] | undefined

}
