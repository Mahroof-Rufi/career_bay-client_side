import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDataListWrapperModule, TuiInputDateModule, TuiInputFilesModule, TuiInputModule, TuiInputPasswordModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiAlertModule, TuiDataListModule, TuiHintModule, TuiTooltipModule } from '@taiga-ui/core';
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
    TuiHintModule,
    LogoComponent,
    FooterComponent
  ]
})
export class SharedModule { }
