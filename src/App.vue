<template>
  <div id="app">
    <v-container>
      <v-row>
        <v-col>
          <Input :listItems="listItems" />
        </v-col>
        <v-col>
          <getMathJSONButton 
          @incoming="handleButtonEmit"/>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Input from "./components/Input.vue";
import getMathJSONButton from "./components/getMathJSONButton.vue";
import { mathFunctionModel } from './models/mathFunction.model';

export default defineComponent({
  name: "App",
  components: {
    Input,
    getMathJSONButton,
  },
  data() {
    return {
      listItems: [] as mathFunctionModel[],
    };
  },
  methods: {
    handleButtonEmit: function(mathFunctionsArr : any[]) { //treat case if there is an error with the API req
      if(this.listItems.length > 0) //do not redo it everytime
        return;
      this.listItems = mathFunctionsArr;
    }
  },
});
</script>

