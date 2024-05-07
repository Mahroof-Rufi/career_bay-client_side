import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { EditProfileComponent } from '../features/company/components/edit-profile/edit-profile.component';

@Injectable({
  providedIn: 'root'
})
export class EmployerEditProfileModalService {

  private registrationDialogue: Observable<any> | undefined;
  private subsciption!: Subscription

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
      this.subsciption = this.registrationDialogue.subscribe((result) => {
        
      })
    }
  }

  closeModal() {
    if (this.subsciption) {
      this.subsciption.unsubscribe()
    }
  }

}
