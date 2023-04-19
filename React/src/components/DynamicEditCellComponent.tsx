import NumberBox from "devextreme-react/number-box";
import TextBox from "devextreme-react/text-box";
import DateBox from "devextreme-react/date-box";
import CheckBox from "devextreme-react/check-box";
import SelectBox from "devextreme-react/select-box";

import { ValueChangedEvent as NumberValueChanged } from "devextreme/ui/number_box";
import { ValueChangedEvent as TextValueChanged } from "devextreme/ui/text_box";
import { ValueChangedEvent as DateValueChanged } from "devextreme/ui/date_box";
import { ValueChangedEvent as CheckValueChanged } from "devextreme/ui/check_box";

import { ValueChangedEvent as SelectValueChanged } from "devextreme/ui/select_box";

import DataSource from "devextreme/data/data_source";
import service from "../data";
import { useCallback } from "react";
import { ColumnEditCellTemplateData } from "devextreme/ui/data_grid";

const dataSource = new DataSource({
    store: {
      type: "array",
      key: "ID",
      data: service.getDropDownData(),
    }
});

function DynamicEditCellComponent({ data }: { data: ColumnEditCellTemplateData }){
    console.log(data);
    const { data: rowData, setValue, value } = data;


    const simpleValueChanged = useCallback((e:NumberValueChanged|TextValueChanged|DateValueChanged|CheckValueChanged) => {
        setValue(e.value);
    }, [setValue]);

    const onSelectValueChanged = useCallback((args:SelectValueChanged) => {
        const newItem = args.component.option("selectedItem");
        setValue(newItem);
    }, [setValue]);

    switch (rowData.Type) {
        case "Number":
            return(
            <div>
                <NumberBox value={value} onValueChanged={simpleValueChanged}></NumberBox>
            </div>)
        case "String":
            return(
            <div>
                <TextBox value={value} onValueChanged={simpleValueChanged}></TextBox>
            </div>)
        case "Date":
            return(
            <div>
                <DateBox value={value} onValueChanged={simpleValueChanged}></DateBox>
            </div>)
        case "Boolean":
            return(
            <div>
                <CheckBox
                    value={value}
                    onValueChanged={simpleValueChanged}>
                </CheckBox>
            </div>)
        case "MyCustomType":
            return (
            <div>
                <SelectBox dataSource={dataSource}
                    value={value ? value.ID : undefined}
                    onValueChanged={onSelectValueChanged}
                    valueExpr='ID'
                    displayExpr='Name'>
                </SelectBox>
            </div>)
        default:
            return(
            <div>
                unkown type
            </div>)
    }
}

export default DynamicEditCellComponent;