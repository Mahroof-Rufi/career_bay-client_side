import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { GetPreviousRouteService } from './shared/services/get-previous-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(
    private readonly _getPreviousRoute:GetPreviousRouteService
  ) { }

  ngOnInit(): void {
    initFlowbite();
  }

}
