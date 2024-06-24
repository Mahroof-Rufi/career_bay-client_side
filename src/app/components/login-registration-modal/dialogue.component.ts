import { Component } from '@angular/core';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss'
})
export class DialogueComponent {
  
  view:string = 'user-login'
  forgotPasswordView!:boolean;

  handleChangeView(value:string) {
    this.view = value
  }

  handleRenderForgotPassword(value:boolean) {
    this.forgotPasswordView = value
  }
}
