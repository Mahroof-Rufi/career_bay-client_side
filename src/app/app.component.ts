import { Component, OnInit } from '@angular/core';
import { ModalService } from './features/auth/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  
  globalVariable!: boolean;

  constructor(private globalService: ModalService) { }

  ngOnInit(): void {
    this.globalService.globalVariable$.subscribe(value => {
      this.globalVariable = value;
    });
  }

}
