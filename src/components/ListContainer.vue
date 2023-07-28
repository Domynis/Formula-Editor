<template></template>

<script lang="ts">
import { defineComponent } from "vue";
import { mathFunctionModel } from "@/models/mathFunction.model";
export default defineComponent({
  props: {
    listItems: {
      type: Array as () => mathFunctionModel[],
      default: () => [],
    },
    searchText: String,
    showList: Boolean,
  },
  data() {
    return {
      message: "",
      filteredList: [] as mathFunctionModel[],
    };
  },
  watch: {
    // Filter the list items based on the search text when showList is true

    searchText(newVal: string) {
      if (this.showList && newVal != "(") {
        this.filteredList = this.listItems.filter((item: mathFunctionModel) =>
          item.name.toLowerCase().startsWith(newVal.toLowerCase())
        );
      }
    },
  },
  methods: {
    handleCloseList() {},
  },
});
</script>

<style>

.formula {
  position: relative;
  font-family: sans-serif;
}

.formula::before {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  margin: 0px;
  height: 3px;
  width: 100%;
  background-color: #f1f1f1;
  font-family: sans-serif;
}

body {
  font: Roboto;
}
</style>
