import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subscription } from 'rxjs';
import { InterviewScheduleComponent } from '../components/interview-schedule/interview-schedule.component';
import { Chat } from '../../../models/chat';
import { User } from '../../user/user-store/user.model';
import { Employer } from '../store/employer.model';

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

  openInterviewScheduleModal(sender:User | Employer,receiver_id:string, message?:Chat) {    
    this.scheduleDialogue = this._dialogueService.open<any>(
      new PolymorpheusComponent(InterviewScheduleComponent, this._injector),
      {
        size:'s',
        data:{sender,receiver_id,viewMode:'interview schedule', message}
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

  openScheduledInterviewCancelModal(sender:User | Employer,receiver_id:string,message:Chat) {
    this.scheduleDialogue = this._dialogueService.open<any>(
      new PolymorpheusComponent(InterviewScheduleComponent, this._injector),
      {
        size:'m',
        data:{sender, receiver_id, viewMode:'cancel',message}
      },
    );

    if (this.scheduleDialogue) {
      this.subscription = this.scheduleDialogue.subscribe()
    }
  }

  closeModal() {
    this.subscription?.unsubscribe()
  }

  openMediaShareModal(senderId:string, receiverId:string, accountType:string) {
    this.scheduleDialogue = this._dialogueService.open<any>(
      new PolymorpheusComponent(InterviewScheduleComponent, this._injector),
      {
        size:'m',
        data:{senderId,receiverId,viewMode:'media share', accountType}
      },
    );

    if (this.scheduleDialogue) {
      this.subscription = this.scheduleDialogue.subscribe()
    }
  }
}
