import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { QuestionModalComponent } from './modals/question-modal/question-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ErrorModalComponent,
  QuestionModalComponent,
],
  exports: [
    ErrorModalComponent,
    QuestionModalComponent,
  ]
})
export class SharedModule { }
