import { Component } from '@angular/core';
import { AuthModalService } from '../../../services/auth-modal-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {

  constructor(
    private readonly _authModal:AuthModalService,
    private readonly router:Router
  ) { }

  showDialog(): void {    
    const userToken = localStorage.getItem('userAccessToken')
    const employerToken = localStorage.getItem('employerAccessToken')
    
    if (userToken) {      
      this.router.navigateByUrl('/user/dashboard')
    } else if (employerToken) {
      this.router.navigateByUrl('/employer/profile') 
    } else {
      this._authModal.openModal()
    }
  }

}

