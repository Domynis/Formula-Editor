<template>
  <div id="app">
    <!-- Use the HelloWorld component -->
    <HelloWorld :listItems="listItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from "./components/HelloWorld.vue";

interface ListItem {
  id: number;
  text: string;
  category: string;
}

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      listItems: [
        { id: 1, text: "Sin", category: "Trigonometry" },
        { id: 2, text: "Cos", category: "Trigonometric" },
        { id: 3, text: "Tan", category: "Trigonometry" },
        { id: 4, text: "xor", category: "Logical" },
        { id: 5, text: "or", category: "Logical" },
      ] as ListItem[], // Add the type assertion for the listItems
    };
  },
});
</script>

