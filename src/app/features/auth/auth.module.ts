import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationDialogueComponent } from './components/registration-dialogue/registration-dialogue.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    RegistrationDialogueComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[SharedModule]
})
export class AuthModule { }
