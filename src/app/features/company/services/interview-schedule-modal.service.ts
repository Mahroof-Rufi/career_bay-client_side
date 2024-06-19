import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { InterviewScheduleComponent } from '../components/interview-schedule/interview-schedule.component';

@Injectable({
  providedIn: 'root'
})
export class InterviewScheduleModalService {

  private scheduleDialogue: Observable<any> | undefined;
  private subscription!: Subscription

  constructor(
    private readonly _dialogueService: TuiDialogService,
    private readonly _injector: Injector,
  ) {}

  openInterviewScheduleModal(receiver_id:string) {    
    this.scheduleDialogue = this._dialogueService.open<any>(
      new PolymorpheusComponent(InterviewScheduleComponent, this._injector),
      {
        size:'s',
        data:receiver_id
      },
    );

    if (this.scheduleDialogue) {
      this.subscription = this.scheduleDialogue.subscribe()
    }
  }

  closeInterviewScheduleModal() {
    if (this.subscription) {
      this.subscription?.unsubscribe()
    }
  }
}
