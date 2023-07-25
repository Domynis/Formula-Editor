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
.list-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 10px;
  position: sticky;
  top: -10px;
  /* Adjust this value to move the sticky element higher */
  background-color: #f1f1f1;
  z-index: 1;
  font-family: sans-serif;
}

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

.close-button {
  width: 40px;
  height: 30px;
}

.list-container {
  margin-top: 20px;
}

.list-item:hover {
  background-color: lightgray;
  cursor: pointer;
}

.list {
  margin-bottom: 20px;
}

body {
  font: Roboto;
}
</style>
