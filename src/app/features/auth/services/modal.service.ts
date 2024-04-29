import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DialogueComponent } from '../../../components/dialogue/dialogue.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalInstance!: Observable<any>;

  constructor(private dialogueService:TuiDialogService, private injector:Injector) { }

  // registrationDialogue = this.dialogueService.open<number>( new PolymorpheusComponent(DialogueComponent, this.injector), {
  //   size:'fullscreen'
  // })

  openModal() {
    return this.modalInstance = this.dialogueService.open<number>(
      new PolymorpheusComponent(DialogueComponent, this.injector),
      { size: 'fullscreen' ,closeable:true}
    );
  }

}
