import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { UserChatService } from '../../../user/services/user-chat.service';
import { TuiAlertService, TuiDialogContext } from '@taiga-ui/core';
import { noSpaceAllowed } from '../../../../validators/no-space-allowed.validator';
import { Chat } from '../../../../models/chat';
import { InterviewScheduleModalService } from '../../services/interview-schedule-modal.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interview-schedule',
  templateUrl: './interview-schedule.component.html',
  styleUrl: './interview-schedule.component.scss'
})
export class InterviewScheduleComponent implements OnInit{

  accountType!:string;
  viewMode!:string;
  title:string = 'Schedule Interview'
  timePeriods:string[] = ['AM','PM']
  message!:Chat;
  mediaFile!:File | null;
  fileUrl: string | null = null;
  fileType: string | null = null;
  receiverId!:string;

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
    private readonly _scheduledInterviewModal: InterviewScheduleModalService,
  ) {}

  ngOnInit(): void {
    const data:any = this.data
    this.viewMode = data.viewMode
    this.accountType = data.accountType
    this.receiverId = data.receiverId
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
        this._chatService.scheduleInterview(data.sender, data.receiver_id, date, time, this.message._id)
      } else {
        this._chatService.scheduleInterview(data.sender, data.receiver_id, date, time)
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
        if (this.accountType == 'user') {
          this._chatService.sendMessageByUser(data.sender_id, data.receiver_id, URL, 'URL', new Date())
          this._scheduledInterviewModal.closeModal()
        } else if (this.accountType == 'employer') {
          this._chatService.sendMessageByEmployer(data.sender_id, data.receiver_id, URL, 'URL', new Date())
          this._scheduledInterviewModal.closeModal()
        }
      }
    } else {
      this.MeetUrlForm.markAllAsTouched()
    }
  } 

  handleMediaFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.mediaFile = input.files[0];
      this.fileType = this.getFileType(this.mediaFile);
      this.fileUrl = URL.createObjectURL(this.mediaFile);
    }
  }

  getFileType(file: File): string {
    if (file.type.startsWith('image/')) {
      return 'image';
    } else if (file.type.startsWith('video/')) {
      return 'video';
    } else if (file.type === 'application/pdf') {
      return 'pdf';
    } else {
      return 'unsupported';
    }
  }

  removeFile() {
    this.mediaFile = null;
    this.fileUrl = null;
    this.fileType = null;
  }

  sendMediaFile() {
    if (!this.mediaFile) {
      this._alert.open('',{
        label: 'Upload a valid media file',
        status: 'warning',
        hasCloseButton: true,
        autoClose: false
      }).subscribe();
    } else {
      const MediaForm = new FormData()
        MediaForm.append('receiver', this.receiverId)
        MediaForm.append('mediaFile', this.mediaFile)
      if (this.accountType == 'user') {
        this._chatService.sendMediaFileByUser(MediaForm)
      } else if (this.accountType == 'employer') {
        this._chatService.sendMediaFileByEmployer(MediaForm)
      }
    }
  }

  cancelInterviewCancellation() {    
    this._scheduledInterviewModal.closeModal()
  }

  cancelScheduledInterview() {
    if (this.message._id) {
      const data:any = this.data
      this._chatService.cancelScheduledInterview(data.sender, data.receiver_id,this.message._id).subscribe()
      this._scheduledInterviewModal.closeModal()
    }
  }

}
