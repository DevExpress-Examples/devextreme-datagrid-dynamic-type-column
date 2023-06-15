<script setup lang="ts">
import { computed } from "vue";
import DxTextBox from "devextreme-vue/text-box";
import DxNumberBox from "devextreme-vue/number-box";
import DxDateBox from "devextreme-vue/date-box";
import DxCheckBox from "devextreme-vue/check-box";
import DxSelectBox from "devextreme-vue/select-box";

import type SelectBox from "devextreme/ui/select_box";
import type { ValueChangedEvent as NumberValueChanged } from "devextreme/ui/number_box";
import type { ValueChangedEvent as TextValueChanged } from "devextreme/ui/text_box";
import type { ValueChangedEvent as DateValueChanged } from "devextreme/ui/date_box";
import type { ValueChangedEvent as CheckValueChanged } from "devextreme/ui/check_box";
import type { ValueChangedEvent as SelectValueChanged } from "devextreme/ui/select_box";

import Service from "../../../services/data";
import type { MyCustomType } from "../../../services/data";

const props = defineProps({
  cellInfo: Object,
});

const myDropdownData = computed<MyCustomType[]>(() => {
  return Service.getMyDropdownData();
});
function handleValueChanged(
  e:
    | TextValueChanged
    | NumberValueChanged
    | DateValueChanged
    | CheckValueChanged
    | SelectValueChanged
) {
  if (props.cellInfo?.data.Type == "MyCustomType") {
    const newValue = (e.component as SelectBox).option("selectedItem");
    props.cellInfo?.setValue(newValue);
  } else props.cellInfo?.setValue(e.value);
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
