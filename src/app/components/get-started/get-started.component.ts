import { Component, Injector } from '@angular/core';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {

  constructor(private modalService:ModalService) { }

  showDialog(): void {
    this.modalService.openModal()
  }

}

