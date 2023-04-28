import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  DxCheckBoxModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';

import { AppComponent } from './app.component';
import { Service } from './app.service';
import { DynamicEditComponentComponent } from './dynamic-edit-component/dynamic-edit-component.component';

@NgModule({
  declarations: [AppComponent, DynamicEditComponentComponent],
  imports: [
    BrowserModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxSelectBoxModule,
  ],
  providers: [Service],
  bootstrap: [AppComponent],
})
export class AppModule {}
