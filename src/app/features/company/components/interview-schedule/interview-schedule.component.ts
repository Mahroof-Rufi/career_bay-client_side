import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { UserChatService } from '../../../user/services/user-chat.service';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'app-interview-schedule',
  templateUrl: './interview-schedule.component.html',
  styleUrl: './interview-schedule.component.scss'
})
export class InterviewScheduleComponent {

  timePeriods:string[] = ['AM','PM']

  interviewScheduleForm = this._formBuilder.group({
    dateAndTime: this._formBuilder.control(null, [Validators.required]),
    timePeriod: this._formBuilder.control(null, [Validators.required])
  });

  constructor(
    private readonly _formBuilder:FormBuilder,
    private readonly _chatService:UserChatService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly _context: TuiDialogContext<string, string>,
  ) {}

  get data(): string {
    return this._context.data
  }

  submitSchedule() {
    if (this.interviewScheduleForm.valid) {
    const formValue = this.interviewScheduleForm.value;

    const dateAndTime:any = formValue.dateAndTime;
    const tuiDay = dateAndTime[0];
    const tuiTime = dateAndTime[1];

    const { year, month, day } = tuiDay;
    const { hours, minutes } = tuiTime;

    const date = new Date(year, month, day)
    const time = `${hours}:${minutes} ${formValue.timePeriod}`

    this._chatService.scheduleInterview(this.data, date, time).subscribe()
    
    } else {
      this.interviewScheduleForm.markAllAsTouched()
    }
    
  }

}
