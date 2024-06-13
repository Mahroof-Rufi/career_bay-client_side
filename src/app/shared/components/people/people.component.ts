import { Component, Input } from '@angular/core';
import { User } from '../../../features/user/user-store/user.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  @Input() userData!:User | any;
  @Input() viewType!: 'Inbox view'

}
