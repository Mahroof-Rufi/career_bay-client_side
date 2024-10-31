import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { AddJobComponent } from '../components/home/job/add-job/add-job.component';

@Injectable()
export class AddJobPostService {

  private addJobDialogue: Observable<any> | undefined;
  private subscription!: Subscription

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector,
  ) {}

  openModal(_id:string | null = null) {    
    if (_id) {
      this.addJobDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(AddJobComponent, this.injector),
        {
          size:'l',
          data: _id
        },
      );
    } else {
      this.addJobDialogue = this.dialogueService.open<any>(
        new PolymorpheusComponent(AddJobComponent, this.injector),
        {
          size:'l',
        },
      );
    }
    if (this.addJobDialogue) {
      this.subscription = this.addJobDialogue.subscribe()
    }
  }

  closeModal() {
      this.subscription?.unsubscribe()
  }
}
