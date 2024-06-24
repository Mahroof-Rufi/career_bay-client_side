import { Component, OnInit } from '@angular/core';
import { UserAPIServiceService } from '../../../services/user-api-service.service';
import { Chat } from '../../../../../models/chat';

@Component({
  selector: 'app-scheduled-interviews',
  templateUrl: './scheduled-interviews.component.html',
  styleUrl: './scheduled-interviews.component.scss'
})
export class ScheduledInterviewsComponent implements OnInit{

  scheduledInterviews!:Chat[]

  constructor(
    private readonly _userAPIs:UserAPIServiceService
  ) {}

  ngOnInit(): void {
    this._userAPIs.fetchScheduledInterview().subscribe({
      next: (res:any) => this.scheduledInterviews =res.scheduledInterviews
    })
  }

}
