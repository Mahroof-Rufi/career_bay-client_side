import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDataListWrapperModule, TuiInputDateModule, TuiInputModule, TuiInputPasswordModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule } from '@taiga-ui/core';

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
    TuiInputDateModule
  ],
  exports: [
    TuiInputModule,
    TuiTextareaModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
    TuiInputDateModule
  ]
})
export class SharedModule { }
