import React from 'react';
import { ColumnCellTemplateData } from 'devextreme/ui/data_grid';
import { SampleItem } from '../data';

function CellComponent({ data }: { data: ColumnCellTemplateData<SampleItem, number> }): React.ReactElement {
  const { data: rowData, value } = data;
  switch (rowData?.Type) {
    case 'Number':
      return (<div>{value.toString()}</div>);
    case 'String':
      return (<div>{value}</div>);
    case 'Date':
      return (<div>{new Date(value).toLocaleDateString()}</div>);
    case 'Boolean':
      return (<div>{value.toString()}</div>);
    case 'MyCustomType':
      return (<div>{value ? value.Name : ''}</div>);
    default:
      return (<div>unknown data type</div>);
  }
}

export default CellComponent;
