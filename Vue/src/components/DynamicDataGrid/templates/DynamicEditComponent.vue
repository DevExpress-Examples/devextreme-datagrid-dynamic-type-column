<script setup lang="ts">
import { computed } from "vue";
import DxTextBox from "devextreme-vue/text-box";
import DxNumberBox from "devextreme-vue/number-box";
import DxDateBox from "devextreme-vue/date-box";
import DxCheckBox from "devextreme-vue/check-box";
import DxSelectBox from "devextreme-vue/select-box";

import Service from "../../../services/data";
import type {
  GridDataModel,
  MyCustomType,
  DynamicType,
} from "../../../services/data";

const props = defineProps({
  cellInfo: Object,
});

const myDropdownData = computed<MyCustomType[]>(() => {
  return Service.getMyDropdownData();
});
function handleValueChanged(e: any) {
  let newValue: DynamicType | MyCustomType["ID"] = e.value;
  if (props.cellInfo?.data.Type == "MyCustomType") {
    newValue = e.component.option("selectedItem");
  }
  props.cellInfo?.setValue(newValue);
}
</script>
<template>
  <div v-if="cellInfo?.data.Type == 'String'">
    <DxTextBox
      :value="cellInfo?.data.DynamicValue"
      @value-changed="handleValueChanged"
    />
  </div>
  <div v-else-if="cellInfo?.data.Type == 'Number'">
    <DxNumberBox
      :value="cellInfo?.data.DynamicValue"
      @value-changed="handleValueChanged"
    />
  </div>
  <div v-else-if="cellInfo?.data.Type == 'Date'">
    <DxDateBox
      :value="cellInfo?.data.DynamicValue"
      @value-changed="handleValueChanged"
    />
  </div>
  <div v-else-if="cellInfo?.data.Type == 'Boolean'">
    <DxCheckBox
      :value="cellInfo?.data.DynamicValue"
      @value-changed="handleValueChanged"
    />
  </div>
  <div v-else-if="cellInfo?.data.Type == 'MyCustomType'">
    <DxSelectBox
      :data-source="myDropdownData"
      value-expr="ID"
      display-expr="Name"
      :value="cellInfo.value?.ID"
      @value-changed="handleValueChanged"
    />
  </div>
  <div v-else>
    <span>Unknown type!</span>
  </div>
</template>
