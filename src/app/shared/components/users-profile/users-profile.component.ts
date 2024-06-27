import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-users-profiles',
  templateUrl: './users-profile.component.html',
  styleUrl: './users-profile.component.scss'
})
export class UsersProfileComponent {
  @Input() userData: any
}
