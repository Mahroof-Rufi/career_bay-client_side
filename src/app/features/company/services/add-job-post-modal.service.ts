import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { AddJobComponent } from '../components/add-job/add-job.component';

@Injectable()
export class AddJobPostService {

  private addJobDialogue: Observable<any> | undefined;
  private subscription!: Subscription

  editId!:string | undefined;

  constructor(
    private dialogueService: TuiDialogService,
    private injector: Injector,
  ) {}

  private initializeDialog() {
    this.addJobDialogue = this.dialogueService.open<any>(
      new PolymorpheusComponent(AddJobComponent, this.injector),
      {
        size:'l',
        data: this.editId
    },
    );
  }

  openModal(_id?:string) {    
    _id ? this.editId = _id : this.editId = ''
    this.initializeDialog();
    if (this.addJobDialogue) {
      this.subscription = this.addJobDialogue.subscribe((result) => {
        
      })
    }
  }

  closeModal() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
