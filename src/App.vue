<template>
  <div id="app">
    <hello-world :list-items="listItems" />
  </div>
</template>

<script>
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default Vue.extend({
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
      ],
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
