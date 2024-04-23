import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
  styleUrl: './application-timeline.component.scss'
})
export class ApplicationTimelineComponent implements OnInit{

  @Input() Applicationdata:any = []

  ngOnInit(): void {
    console.log(this.Applicationdata);
    
  }

}
