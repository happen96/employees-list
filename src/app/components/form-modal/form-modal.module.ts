import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormModalComponent } from './form-modal.component';

@NgModule({
  declarations: [FormModalComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormModalComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class FormModalModule { }
