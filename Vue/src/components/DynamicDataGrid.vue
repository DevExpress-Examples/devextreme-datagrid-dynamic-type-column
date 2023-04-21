<script setup lang="ts">
import { computed } from "vue";

import "devextreme/dist/css/dx.material.blue.light.compact.css";
import DxDataGrid from "devextreme-vue/data-grid";

import Service from "../services/data";
import type { GridDataModel } from "../services/data";

const sampleData = computed<GridDataModel[]>(() => {
  return Service.getSampleData();
});
</script>
<template>
  <div>
    <DxDataGrid :data-source="sampleData"> </DxDataGrid>
  </div>
</template>
