import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import { useCallback } from 'react';
import service, { SampleItem } from "./data";

import DataGrid, {Editing, Column, Lookup} from 'devextreme-react/data-grid';

import DynamicEditCellComponent from './components/DynamicEditCellComponent';
import CellComponent from './components/CellComponent';

import {   InitNewRowEvent } from 'devextreme/ui/data_grid';

const typeList = ["String","Number","Date","Boolean", "MyCustomType"];
const ds = service.getData();
function App() {
  const typeCellValue = useCallback((newData: SampleItem, type:String) => {
    newData.Type = type;
    newData.DynamicValue = null;
  }, []);

  const onInitNewRow = useCallback((e:InitNewRowEvent<SampleItem, number>) =>{
    const newKey = Math.max(...service.getData().map(item=>item.ID)) + 1;
    e.data.ID = newKey;
    e.data.Type = "defaultType";
    e.data.DynamicValue = "defaultValue";
  }, []);

  return (
    <div className="main">
      <DataGrid<SampleItem, number>
        dataSource={ds}
        keyExpr='ID'
        showBorders={true}
        onInitNewRow={onInitNewRow}
        repaintChangesOnly={true}>
          <Editing
            allowUpdating={true}
            allowAdding={true}
            mode="form"></Editing>
          <Column
            dataField="ID"
            allowEditing={false}
          ></Column>
          <Column
            dataField="DynamicValue"
            dataType="object"
            editCellComponent={DynamicEditCellComponent}
            cellComponent={CellComponent}
          ></Column>
          <Column
            dataField="Type"
            setCellValue={typeCellValue}
          >
            <Lookup dataSource={typeList}></Lookup>
          </Column>
      </DataGrid>
    </div>
  );
}

export default App;
