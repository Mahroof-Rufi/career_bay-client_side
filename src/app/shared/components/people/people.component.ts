import { Component, Input } from '@angular/core';
import { User } from '../../../features/user/user-store/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss'
})
export class PeopleComponent {
  @Input() userData!:User | any;
  @Input() context!:'User' | 'Employer'
  @Input() viewType!: 'Inbox view'

  constructor(
    private readonly _router:Router
  ) {}

  navigate() {
    if (this.context == 'User') {
      this._router.navigate(['/user/inbox', 'user', this.userData._id], {
        queryParams: { profileType: 'Users' }
      });
    } else if (this.context == 'Employer') {
      this._router.navigate(['/employer/inbox', 'employer', this.userData._id], {
        queryParams: { profileType: 'Users' }
      });
    }
  }

}
