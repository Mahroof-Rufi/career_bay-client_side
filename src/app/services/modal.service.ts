import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { DialogueComponent } from '../components/dialogue/dialogue.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private registrationDialogue: Observable<any> | undefined;
  private subscription: Subscription | undefined;

  constructor(private dialogueService: TuiDialogService, private injector: Injector) {
    this.initializeDialog();
  }

  private initializeDialog() {
    this.registrationDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(DialogueComponent, this.injector),
      {
        size:'l',
    },
    );
  }

  openModal() {
    if (this.registrationDialogue) {
      this.subscription = this.registrationDialogue.subscribe((result) => {
        // Handle modal result if needed
      });
    }
  }

  closeModal() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

