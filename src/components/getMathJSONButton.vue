<template>
  <div class="get-math-json-button">
    <v-btn type="button" class="button" @click="getMathJSON">get MathJS docs</v-btn>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "get-math-JSON-button",
  mounted() {
    // console.log('hello from app comp');
  },
  methods: {
    getMathJSON: function (event: Event) {
      axios
        .post("http://localhost:3000/api/loadData", "loadMathData") // will console.log the mathJs functions objects found in an array (wip)
        .then((response) => {
          console.log(response.data);
          this.$emit('incoming', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

});

</script>

<style scoped lang="scss">
.get-math-json-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  
}
</style>
