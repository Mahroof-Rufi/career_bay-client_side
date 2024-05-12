import { Component, Injector } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {

  constructor(
    private modalService:ModalService,
    private router:Router
  ) { }

  showDialog(): void {
    console.log('clicked');
    
    const userToken = localStorage.getItem('userToken')
    const employerToken = localStorage.getItem('employerToken')
    
    if (userToken) {
      this.router.navigateByUrl('/user/dashboard')
    } else if (employerToken) {
      this.router.navigateByUrl('/employer/profile') 
    } else {
      this.modalService.openModal()
    }
  }

}

