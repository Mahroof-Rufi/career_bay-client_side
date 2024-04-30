import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DialogueComponent } from '../../../components/dialogue/dialogue.component';
import { BehaviorSubject, Observable, Subscriber, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalInstance!: Observable<any>;

  constructor(private dialogueService:TuiDialogService, private injector:Injector) { }

  private globalVariableSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  globalVariable$: Observable<boolean> = this.globalVariableSubject.asObservable();

  setGlobalVariable(value: boolean) {
    this.globalVariableSubject.next(value);
  }

  registrationDialogue = this.dialogueService.open<number>( new PolymorpheusComponent(DialogueComponent, this.injector), {
    size:'fullscreen', dismissible:true,closeable:true
  })

  subscribed!: Subscription

  openModal() {
    this.setGlobalVariable(false)
    this.subscribed = this.registrationDialogue.subscribe()
  }

  closeModal() {
    this.setGlobalVariable(true)
    this.subscribed.unsubscribe()
  }

}
