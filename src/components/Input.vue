<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="input-container">
          <div class="input-button-container">
            <v-text-field class="mx-2 red-input" v-model="searchText" @input="handleInputChange"
              placeholder="Search items"></v-text-field>
            <v-btn class="mx-2" small fab dark color='#4b53b9' @click="handleButtonClick">
              <v-icon>
                mdi-function-variant
              </v-icon>
            </v-btn>
          </div>
          <div
            class="list-container-wrapper"
            v-if="showList"
            @click="handleMouseOver"
          >
            <v-list class="list">
              <div class="list-item-header">
                <div class="formula">Write Formula</div>
                <v-btn class="mx-2" fab dark x-small color="#4b53b9" @click="handleCloseList">
                  <v-icon dark>
                    mdi-alpha-x
                  </v-icon>
                </v-btn>
              </div>
              <template v-for="(item, index) in filteredList" @key="item.name">
                <v-hover v-slot:default="{ hover }">
                  <v-list-item :key="item.name" class="custom-list-item list-item" style="height: auto">
                    <v-list-item-content>
                      <div>
                        {{ index + 1 + ". " + item.name + " " + item.category }}
                      </div>
                      <div v-if="hover">
                        {{ item.description.at(0) }}
                      </div>
                    </v-list-item-content>
                  </v-list-item>
                </v-hover>
              </template>
            </v-list>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListContainer from "./ListContainer.vue";
import axios from "axios";
import getMathJSONButton from "./getMathJSON.vue";
import { mathFunctionModel } from "../models/mathFunction.model";

export default defineComponent({
  name: "hello-world",
  components: {
    getMathJSONButton,
    ListContainer,
  },
  data() {
    return {
      message: "",
      searchText: "",
      showList: false,
      letter: "",
      searchTextCopy: "",
    };
  },
  props: {
    listItems: {
      type: Array as () => mathFunctionModel[],
      default: () => [],
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/hello")
      .then((response) => {
        this.message = response.data.message; // Setting the message data property with the response data
      })
      .catch((error) => {
        console.error(error); // Handling errors if the request fails
      });
  },
  computed: {
    filteredList(): mathFunctionModel[] {
      // Computed property to filter the listItems based on the searchText
      return this.listItems.filter((item: mathFunctionModel) =>
        item.name.toLowerCase().startsWith(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    handleButtonClick() {
      // Method to handle button click event
      this.showList = true; // Show the list when the button is clicked
    },
    handleMouseOver(event: Event) {
      // Type guard to ensure event.target is not null
      if (event.target instanceof HTMLElement) {
        // Take the html element that is clicked and obtain the name of the function
        this.showList = true; // Show the list when mouse is over the component
        const elementMouseOver = event.target;
        const textContent = elementMouseOver.textContent!.trim(); // Use ! to assert that textContent is not null
        const indexOfDot = textContent.indexOf(".");
        const result = textContent.substring(indexOfDot + 2);
        const firstSpaceIndex = result.indexOf(" ");
        const finalResult = result.substring(0, firstSpaceIndex);

        //search for a match in the filteredList, if found display the syntax for the function in the input
        for (let i = 0; i < this.filteredList.length; i++) {
          if (finalResult == this.filteredList[i].name) {
            const syntax = this.filteredList[i].syntax;
            console.log(syntax);
            this.searchText = "";
            this.searchText += syntax;
            this.showList = false;
          }
        }
      }
    },
    handleCloseList() {
      // Method to close the list
      this.showList = false; // Hide the list
    },
    handleInputChange() {
      // Method to handle input change events
      this.letter = this.searchText.slice(-1);
      this.searchTextCopy = this.searchText.slice(0, -1); // Update the searchText
      //If in the input is typed ( , we are searching for a possible function with the name of the searchText and
      //append it's sytnax to the input
      if (this.letter == "(") {
        for (let i = 0; i < this.filteredList.length; i++) {
          if (this.searchTextCopy == this.filteredList[i].name) {
            const syntax = this.filteredList[i].syntax;
            console.log(syntax);
            this.searchText = "";
            this.searchText += syntax;
            this.showList = false;
          }
        }
      }
    },
  },
});
</script>

<style>
.input-container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  /* Display the content in a column */
  align-items: center;
  /* Center items horizontally in the container */
  background-color: #f1f1f1;
  width: 400px;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
}

.input-button-container {
  margin: 1 1;
  display: flex;
  align-items: center;
  flex: 1;
}

.red-input {
  border: none;
  border-radius: 10px;
  /* Make the input field rounded */
  background-color: #f1f1f1;
  padding: 10px;
  /* Adjust the padding for better alignment */
  margin-top: 20px;
  flex: 1;
  height: 2;
  size: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Add a subtle box-shadow */
  resize: none;
  /* Prevent the input field from being resizable */
  max-height: 7.5em;
  /* Limit the input field to a maximum of 5 lines (7.5em = 5 lines x 1.5em line-height) */
  overflow-y: auto;
  /* Enable vertical scrolling when content exceeds the maximum height */
}

.arrow-button {
  background-color: #f1f1f1;
  height: 30px;
  width: 30px;
  cursor: pointer;
  color: #666;
  font-weight: bold;
  border-radius: 50%;
  /* Make the button circular */
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 30px;
}

.list-container-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Add a subtle box-shadow */
}

.list {
  display: block;
  width: 400px;
  /* Adjust the width of the list container */
  max-height: 200px;
  /* Limit the maximum height to create a scrollable list */
  overflow-y: auto;
  /* Enable vertical scrolling when list exceeds the height */
  font-size: 10px;
}

.list-item {
  background-color: #ffffff;
  /* White background for each list item */
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Add a subtle box-shadow */
  height: 10px;
}
</style>