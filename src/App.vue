<template>
  <div id="app">
    <v-container>
      <v-row>
        <v-col>
          <HelloWorld :listItems="listItems" />
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
import HelloWorld from "./components/HelloWorld.vue";
import getMathJSONButton from "./components/getMathJSONButton.vue";

interface ListItem {
  id: number;
  text: string;
  category: string;
}

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    getMathJSONButton,
  },
  data() {
    return {
      listItems: [
        { id: 1, text: "Sin", category: "Trigonometry" },
        { id: 2, text: "Cos", category: "Trigonometric" },
        { id: 3, text: "Tan", category: "Trigonometry" },
        { id: 4, text: "xor", category: "Logical" },
        { id: 5, text: "or", category: "Logical" },
        { id: 6, text: "Substraction", category: "Algebra" },
      ] as ListItem[], // Add the type assertion for the listItems
    };
  },
  methods: {
    handleButtonEmit: function(mathFunctionsArr : any[]) {
      this.listItems.length = 0;
      mathFunctionsArr.forEach((element, index) => {
        let newObj : ListItem = {
          id : index,
          text : element.name,
          category : element.category,
        }
        this.listItems.push(newObj);
      });
    }
  },
});
</script>

