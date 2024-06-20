import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { InterviewScheduleComponent } from '../components/interview-schedule/interview-schedule.component';
import { Chat } from '../../../models/chat';

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

  openInterviewScheduleModal(receiver_id:string, message?:Chat) {    
    this.scheduleDialogue = this._dialogueService.open<any>(
      new PolymorpheusComponent(InterviewScheduleComponent, this._injector),
      {
        size:'s',
        data:{receiver_id,viewMode:'interview schedule', message}
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

  openMeetUrlModal(sender_id:string,receiver_id:string,accountType:string) {
    this.scheduleDialogue = this._dialogueService.open<any>(
      new PolymorpheusComponent(InterviewScheduleComponent, this._injector),
      {
        size:'s',
        data:{sender_id,receiver_id,viewMode:'meet url',accountType}
      },
    );

    if (this.scheduleDialogue) {
      this.subscription = this.scheduleDialogue.subscribe()
    }
  } 

  openScheduledInterviewCancelModal(message:Chat) {
    this.scheduleDialogue = this._dialogueService.open<any>(
      new PolymorpheusComponent(InterviewScheduleComponent, this._injector),
      {
        size:'m',
        data:{viewMode:'cancel',message}
      },
    );

    if (this.scheduleDialogue) {
      this.subscription = this.scheduleDialogue.subscribe()
    }
  }

  closeModal() {
    this.subscription?.unsubscribe()
  }
}
