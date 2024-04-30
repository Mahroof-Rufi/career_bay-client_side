import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDataListWrapperModule, TuiInputDateModule, TuiInputFilesModule, TuiInputModule, TuiInputPasswordModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiAlertModule, TuiDataListModule, TuiHintModule, TuiTooltipModule } from '@taiga-ui/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    
  
  
  ],
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextareaModule,
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
    TuiHintModule
  ],
  exports: [
    TuiInputModule,
    TuiTextareaModule,
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
    TuiHintModule
  ]
})
export class SharedModule { }
