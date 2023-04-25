<script setup lang="ts">
import { computed } from "vue";

import "devextreme/dist/css/dx.material.blue.light.compact.css";
import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxLookup,
} from "devextreme-vue/data-grid";

import Service from "../../services/data";
import type {
  GridDataModel,
  MyCustomType,
  DynamicType,
} from "../../services/data";
import type { InitNewRowEvent } from "devextreme/ui/data_grid";

import DynamicEditComponent from "./templates/DynamicEditComponent.vue";

const sampleData = computed<GridDataModel[]>(() => {
  return Service.getSampleData();
});
const typeList = computed<string[]>(() => {
  return Service.getTypeList();
});

function getDynamicDisplayText(rowData: GridDataModel): string {
  const valueType = rowData.Type,
    value = rowData.DynamicValue;
  const formatterMap: {
    [key: string]: DynamicType | undefined | null;
  } = {
    _default: "unknown data type",
    String: value,
    Number: value?.toString(),
    Boolean: value?.toString() || "null",
    Date: new Date(value as string).toLocaleDateString(),
    MyCustomType: value ? (value as MyCustomType).Name : "",
  };
  return formatterMap[valueType || "_default"] as string;
}
function handleInitNewRow(e: InitNewRowEvent) {
  const newKey =
    Math.max(...Service.getSampleData().map((item) => item.ID)) + 1;
  e.data.ID = newKey;
  e.data.Type = Service.getDefaultType();
  e.data.DynamicValue = Service.getDefaultValue();
}
function setCellValue(newData: GridDataModel, type: string) {
  newData.Type = type;
  newData.DynamicValue = null;
}
</script>

<template>
  <div>
    <DxDataGrid
      :data-source="sampleData"
      key-expr="ID"
      :show-borders="true"
      @init-new-row="handleInitNewRow"
    >
      <DxEditing mode="form" :allow-updating="true" :allow-adding="true" />
      <DxColumn data-field="ID" :allow-editing="false" />
      <DxColumn
        data-field="DynamicValue"
        data-type="object"
        :calculate-display-value="getDynamicDisplayText"
        edit-cell-template="edit-cell-template"
      />
      <DxColumn data-field="Type" :set-cell-value="setCellValue">
        <DxLookup :data-source="typeList" />
      </DxColumn>
      <template #edit-cell-template="{ data }">
        <DynamicEditComponent :cell-info="data"/>
      </template>
    </DxDataGrid>
  </div>
</template>
