import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-applied-jobs-col',
  templateUrl: './applied-jobs-col.component.html',
  styleUrl: './applied-jobs-col.component.scss'
})
export class AppliedJobsColComponent implements OnInit{
  @Input() Job:any;

  showStatus: boolean = false;
  status!:string

  ngOnInit(): void {
    console.log(this.Job);
    this.status = this.Job.status
  }

  toggleStatus() {
    this.showStatus = !this.showStatus;
  }
}
