import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-application-timeline',
  templateUrl: './application-timeline.component.html',
  styleUrl: './application-timeline.component.scss'
})
export class ApplicationTimelineComponent {
  @Input() ApplicationData:any = []

}
