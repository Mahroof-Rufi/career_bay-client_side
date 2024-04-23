import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent implements OnInit{

  @Input() jobData: any;

  ngOnInit(): void {
    
    
  }
}
