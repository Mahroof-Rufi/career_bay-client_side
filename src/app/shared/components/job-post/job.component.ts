import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../../features/user/user-store/user.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobPostComponent {

  @Input() jobData!:any;
}
