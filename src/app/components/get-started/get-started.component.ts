import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {

  constructor(private router:Router) { }

  showDialog(): void {
    this.router.navigateByUrl('/auth/user/login')
  }

}

