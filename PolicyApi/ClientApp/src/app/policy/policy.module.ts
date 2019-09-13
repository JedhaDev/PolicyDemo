import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';
import {NgxPaginationModule} from 'ngx-pagination';

import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { PolicyListComponent } from './policy-list/policy-list.component';
import { PolicyDetailsComponent } from './policy-details/policy-details.component';
import { PolicyCreateComponent } from './policy-create/policy-create.component';
import { PolicyUpdateComponent } from './policy-update/policy-update.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    MyDatePickerModule,
    NgxPaginationModule,
    TranslateModule,
    RouterModule.forChild([
      { path: 'list', component: PolicyListComponent },
      { path: 'details/:id', component: PolicyDetailsComponent },
      { path: 'create', component: PolicyCreateComponent },
      { path: 'update/:id', component: PolicyUpdateComponent }
    ]),
    SharedModule
  ],
  declarations: [PolicyListComponent, PolicyDetailsComponent, PolicyCreateComponent, PolicyUpdateComponent],
  exports: [
    TranslateModule
  ],
  providers: [ ],
})
export class PolicyModule {

}

