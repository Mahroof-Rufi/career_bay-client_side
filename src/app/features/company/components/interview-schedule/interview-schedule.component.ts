import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { UserChatService } from '../../../user/services/user-chat.service';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { noSpaceAllowed } from '../../../../validators/no-space-allowed.validator';
import { Chat } from '../../../../models/chat';
import { InterviewScheduleModalService } from '../../services/interview-schedule-modal.service';

@Component({
  selector: 'app-interview-schedule',
  templateUrl: './interview-schedule.component.html',
  styleUrl: './interview-schedule.component.scss'
})
export class InterviewScheduleComponent implements OnInit{

  context!:string;
  title:string = 'Schedule Interview'
  timePeriods:string[] = ['AM','PM']
  message!:Chat;

  MeetUrlForm = this._formBuilder.group({
    URL: this._formBuilder.control(null, [Validators.required, noSpaceAllowed])
  })

  interviewScheduleForm = this._formBuilder.group({
    dateAndTime: this._formBuilder.control(null, [Validators.required]),
    timePeriod: this._formBuilder.control(null, [Validators.required])
  });

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _chatService:UserChatService,
    private readonly _alert:TuiAlertService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
    private readonly _scheduledInterviewModal: InterviewScheduleModalService
  ) {}

  ngOnInit(): void {
    const data:any = this.data
    this.context = data.context
    if (data.message) {
      this.title = 'Reschedule Interview'
      this.message = data.message
    } else {
      this.message = {} as Chat;
    }
  }

  get data(): string {
    return this._context.data
  }

  submitSchedule() {
    if (this.interviewScheduleForm.valid) {
      const formValue = this.interviewScheduleForm.value;
  
      const dateAndTime: any = formValue.dateAndTime;
      const tuiDay = dateAndTime[0];
      const tuiTime = dateAndTime[1];
  
      const { year, month, day } = tuiDay;
      const { hours, minutes } = tuiTime;
  
      const date = new Date(year, month, day);
      const time = `${hours}:${minutes} ${formValue.timePeriod}`;
  
      const data: any = this.data;
      if (this.message && this.message._id) {
        this._chatService.scheduleInterview(data.receiver_id, date, time, this.message._id).subscribe()
      } else {
        this._chatService.scheduleInterview(data.receiver_id, date, time).subscribe()
      }
      this._scheduledInterviewModal.closeModal();
    } else {
      this.interviewScheduleForm.markAllAsTouched();
    }
  }

  submitUrl() {
    if (this.MeetUrlForm.valid) {
      const data:any = this.data
      const URL = this.MeetUrlForm.get('URL')?.value
      if (URL) {
        this._chatService.sendMessageByEmployer(data.sender_id, data.receiver_id, URL, 'URL', new Date())
        this._scheduledInterviewModal.closeModal()
      }
    } else {
      this.MeetUrlForm.markAllAsTouched()
    }
  } 

  cancelInterviewCancellation() {    
    this._scheduledInterviewModal.closeModal()
  }

  cancelScheduledInterview() {
    if (this.message._id) {
      this._chatService.cancelScheduledInterview(this.message._id).subscribe()
      this._scheduledInterviewModal.closeModal()
    }
  }

}
