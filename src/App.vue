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
  description: string;
  syntax: string;
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
        { id: 1, text: "Sin", category: "Trigonometry", description: "Compute the sine of x in radians.", syntax: "sin(x)"},
        { id: 2, text: "Cos", category: "Trigonometry", description: "Compute the cosine of x in radians.", syntax: "cos(x)" },
        { id: 3, text: "Tan", category: "Trigonometry", description: "Compute the tangent of x in radians.", syntax: "tan(x)" },
        { id: 4, text: "xor", category: "Logical", description: "dummy", syntax: "dummy syntax" },
        { id: 5, text: "or", category: "Logical", description: "dummy", syntax: "dummy syntax" },
        { id: 6, text: "Substraction", category: "Algebra", description: "dummy", syntax: "dummy syntax" },
      ] as ListItem[], // Add the type assertion for the listItems
    };
  },
  methods: {
    handleButtonEmit: function(mathFunctionsArr : any[]) { //treat case if there is an error with the API req
      if(this.listItems.length > 10) //do not redo it everytime
        return;
      this.listItems.length = 0;
      mathFunctionsArr.forEach((element, index) => { 
        let newObj : ListItem = {
          id : index + 1,
          text : element.name,
          category : element.category,
          description: element.description,
          syntax: element.syntax,
        }
        this.listItems.push(newObj);
      });
    }
  },
});
</script>

