import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-detailed-view',
  templateUrl: './job-detailed-view.component.html',
  styleUrl: './job-detailed-view.component.scss'
})
export class JobDetailedViewComponent implements OnInit{

  jobId!:string;

  constructor(
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.params['id'];
  }

}
