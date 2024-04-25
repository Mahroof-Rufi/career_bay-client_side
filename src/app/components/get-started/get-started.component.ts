import { Component, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { RegistrationDialogueComponent } from '../../features/auth/components/registration-dialogue/registration-dialogue.component';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent {

  constructor( private readonly dialogs: TuiDialogService, private readonly injector: Injector) { }

  private readonly registrationDialogue = this.dialogs.open<number>( new PolymorpheusComponent(RegistrationDialogueComponent, this.injector),{
      size:'fullscreen',
      
    },
  );


  showDialog(): void {
    this.registrationDialogue.subscribe({
      next: data => {
        console.info(`Dialog emitted data = ${data}`);
      },
      complete: () => {
        console.info('Dialog closed');
      },
    });
  }

}

