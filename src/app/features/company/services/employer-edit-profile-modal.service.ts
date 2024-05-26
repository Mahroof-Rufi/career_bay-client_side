import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';

@Injectable()
export class EmployerEditProfileModalService {

  private registrationDialogue: Observable<any> | undefined;
  private subscription!: Subscription

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector,
  ) {
    this.initializeDialog();
  }

  private initializeDialog() {
    this.registrationDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(EditProfileComponent, this.injector),
      {
        size:'l',
    },
    );
  }

  openModal() {
    if (this.registrationDialogue) {
      this.subscription = this.registrationDialogue.subscribe((result) => {
        
      })
    }
  }

  closeModal() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
