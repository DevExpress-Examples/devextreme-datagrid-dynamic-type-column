import { Component, Input } from '@angular/core';
import { DynamicType, MyCustomType, Service } from '../app.service';
import dxDataGrid, {
  ColumnEditCellTemplateData,
} from 'devextreme/ui/data_grid';

@Component({
  selector: 'dynamic-edit-component',
  templateUrl: './dynamic-edit-component.component.html',
  styleUrls: ['./dynamic-edit-component.component.css'],
})
export class DynamicEditComponentComponent {
  @Input() cellInfo: ColumnEditCellTemplateData;
  myDropdownData: MyCustomType[];

  constructor(private service: Service) {
    this.myDropdownData = this.service.getMyDropdownData();
  }

  handleValueChanged(e: { value: DynamicType; component: dxDataGrid }) {
    let newValue: DynamicType | MyCustomType['ID'] | unknown = e.value;
    if (this.cellInfo.data.Type == 'MyCustomType') {
      newValue = e.component.option('selectedItem');
    }
    this.cellInfo?.setValue(newValue);
  }
}
