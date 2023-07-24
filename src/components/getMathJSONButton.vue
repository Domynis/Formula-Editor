<template>
  <div class="get-math-json-button">
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "get-math-JSON-button",
  beforeMount() {
    // Call the method to get the MathJS data before the page is loaded
    this.getMathJSON();
  },
  methods: {
    getMathJSON: function () {
      axios
        .post("http://localhost:3000/api/loadData", "loadMathData")
        .then((response) => {
          console.log(response.data);
          // Emit the data to the parent component
          this.$emit("incoming", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
</script>

<style scoped lang="scss">
.get-math-json-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>