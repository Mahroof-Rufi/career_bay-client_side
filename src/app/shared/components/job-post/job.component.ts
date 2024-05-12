import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../../store/user-store/user.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobPostComponent implements OnInit{

  @Input() jobData!:any;

  ngOnInit(): void {
    
    
  }
}
