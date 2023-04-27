import { Component } from '@angular/core';
import {
  GridDataModel,
  DynamicType,
  MyCustomType,
  Service,
} from './app.service';
import { DataRowTemplateData } from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  sampleData: GridDataModel[];
  typeList: string[];

  constructor(private service: Service) {
    this.sampleData = service.getSampleData();
    this.typeList = service.getTypeList();
  }

  onInitNewRow(e: DataRowTemplateData) {
    const newKey =
      Math.max(...this.sampleData.map((item: GridDataModel) => item.ID)) + 1;

    e.data.ID = newKey;
    e.data.Type = this.service.getDefaultType();
    e.data.DynamicValue = this.service.getDefaultValue();
  }

  getDynamicDisplayText(rowData: GridDataModel): string {
    const valueType = rowData.Type,
      value = rowData.DynamicValue;
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

  setCellValue(newData: GridDataModel, type: string) {
    newData.Type = type;
    newData.DynamicValue = '';
  }
}
