import { Component, Input } from '@angular/core';
import { ColumnEditCellTemplateData } from 'devextreme/ui/data_grid';
import dxTextBox from 'devextreme/ui/text_box';
import dxNumberBox from 'devextreme/ui/number_box';
import dxDateBox from 'devextreme/ui/date_box';
import dxCheckBox from 'devextreme/ui/check_box';
import dxSelectBox from 'devextreme/ui/select_box';
import { DynamicType, MyCustomType, Service } from '../app.service';
import { DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';

type EditorComponent =
  | dxTextBox
  | dxNumberBox
  | dxDateBox
  | dxCheckBox
  | dxSelectBox;

@Component({
  selector: 'dynamic-edit-component',
  imports: [DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule],
  templateUrl: './dynamic-edit-component.component.html',
  styleUrls: ['./dynamic-edit-component.component.css'],
})
export class DynamicEditComponentComponent {
  @Input() cellInfo: ColumnEditCellTemplateData;

  myDropdownData: MyCustomType[];

  constructor(service: Service) {
    this.myDropdownData = service.getMyDropdownData();
  }

  handleValueChanged(e: { value?: DynamicType; component: EditorComponent }): void {
    let newValue: DynamicType | MyCustomType['ID'] | unknown = e.value;
    if (this.cellInfo.data.Type == 'MyCustomType') {
      newValue = (e.component as dxSelectBox).option('selectedItem');
    }
    this.cellInfo?.setValue(newValue);
  }
}
