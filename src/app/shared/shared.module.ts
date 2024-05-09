import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TuiArrowModule,
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule, 
  TuiInputDateModule, 
  TuiInputFilesModule, 
  TuiInputModule, 
  TuiInputPasswordModule, 
  TuiInputPhoneInternationalModule, 
  TuiInputPhoneModule, 
  TuiSelectModule, 
  TuiTextareaModule 
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAlertModule, TuiDataListModule, TuiHintModule, TuiTextfieldControllerModule, TuiTooltipModule } from '@taiga-ui/core';
import { HttpClientModule } from '@angular/common/http';
import { LogoComponent } from './components/logo/logo.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    LogoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputDateModule,
    HttpClientModule,
    TuiAlertModule,
    TuiInputFilesModule,
    TuiTooltipModule,
    TuiHintModule,
    TuiInputPhoneModule,
    TuiInputPhoneInternationalModule,
    TuiTextareaModule,
    TuiCheckboxLabeledModule,
    TuiTextfieldControllerModule,
    TuiArrowModule
  ],
  exports: [
    TuiInputModule,
    TuiTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputDateModule,
    HttpClientModule,
    TuiAlertModule,
    TuiInputFilesModule,
    TuiTooltipModule,
    TuiHintModule,
    LogoComponent,
    FooterComponent,
    TuiInputPhoneModule,
    TuiInputPhoneInternationalModule,
    TuiTextareaModule,
    TuiCheckboxLabeledModule,
    TuiTextfieldControllerModule,
    TuiArrowModule 
  ]
})
export class SharedModule { }
