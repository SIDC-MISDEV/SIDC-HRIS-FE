import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { Ng2FlatpickrCustomDirective } from '../ui/directives/ng2-flatpickr-custom.directive';



@NgModule({
  declarations: [
    Ng2FlatpickrCustomDirective
  ],
  imports: [
   
  ],
  exports: [
    Ng2FlatpickrCustomDirective
  ]
})
export class SharedModule { }
