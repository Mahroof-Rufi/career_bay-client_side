import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class MainPageComponent {
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
