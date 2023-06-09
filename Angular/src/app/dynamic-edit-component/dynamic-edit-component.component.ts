import { Component, Input } from '@angular/core';
import dxDataGrid, {
  ColumnEditCellTemplateData,
} from 'devextreme/ui/data_grid';
import { DynamicType, MyCustomType, Service } from '../app.service';

@Component({
  selector: 'dynamic-edit-component',
  templateUrl: './dynamic-edit-component.component.html',
  styleUrls: ['./dynamic-edit-component.component.css'],
})
export class DynamicEditComponentComponent {
  @Input() cellInfo: ColumnEditCellTemplateData;

  myDropdownData: MyCustomType[];

  constructor(service: Service) {
    this.myDropdownData = service.getMyDropdownData();
  }

  handleValueChanged(e: { value: DynamicType; component: dxDataGrid }): void {
    let newValue: DynamicType | MyCustomType['ID'] | unknown = e.value;
    if (this.cellInfo.data.Type == 'MyCustomType') {
      newValue = e.component.option('selectedItem');
    }
    this.cellInfo?.setValue(newValue);
  }
}
