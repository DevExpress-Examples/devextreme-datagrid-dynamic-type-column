import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InitNewRowEvent } from 'devextreme/ui/data_grid';
import { DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { DynamicEditComponentComponent } from './dynamic-edit-component/dynamic-edit-component.component';
import {
  GridDataModel, DynamicType, MyCustomType, Service,
} from './app.service';

@Component({
  selector: 'app-root',
  imports: [DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule, DynamicEditComponentComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  service: Service;

  sampleData: GridDataModel[];

  typeList: string[];

  constructor(service: Service) {
    this.service = service;
    this.sampleData = service.getSampleData();
    this.typeList = service.getTypeList();
  }

  onInitNewRow(e: InitNewRowEvent): void {
    e.data.ID = this.service.getNextId();
    e.data.Type = this.service.getDefaultType();
    e.data.DynamicValue = this.service.getDefaultValue();
  }

  getDynamicDisplayText(rowData: GridDataModel): string {
    const valueType = rowData.Type;
    const value = rowData.DynamicValue;
    const formatterMap: {
      [key: string]: DynamicType;
    } = {
      _default: 'unknown data type',
      String: value,
      Number: value?.toString(),
      Boolean: value?.toString() || 'null',
      Date: new Date(value as string).toLocaleDateString(),
      MyCustomType: value ? (value as MyCustomType).Name : '',
    };
    return formatterMap[valueType || '_default'] as string;
  }

  setCellValue(newData: GridDataModel, type: string): void {
    newData.Type = type;
    newData.DynamicValue = '';
  }
}
