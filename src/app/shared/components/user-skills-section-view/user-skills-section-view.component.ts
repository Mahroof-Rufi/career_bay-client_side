import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-skills-section-view',
  templateUrl: './user-skills-section-view.component.html',
  styleUrl: './user-skills-section-view.component.scss'
})
export class UserSkillsSectionViewComponent {
  @Input() skills:string[] | undefined
}
