<template>
  <div id="app">
    <hello-world msg="Welcome to Your Vue.js + TypeScript App" />
    <Button></Button> 
    <list></list>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Button from "./components/Button.vue"; 
import List from "./components/List.vue"; 

export default Vue.extend({
  name: "App",
  components: {
    HelloWorld,
    Button, // Adding the custom Button component to the components object
    List,
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
