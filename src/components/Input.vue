<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="main-container">
          <div class="input-container">
            <div class="input-button-container">
              <v-text-field
                class="mx-2 red-input"
                v-model="searchText"
                @input="handleInputChange"
                placeholder="Search items"
              ></v-text-field>

              <m-tooltip top>
                <template v-slot:element>
                  <v-btn
                    class="mx-2"
                    small
                    fab
                    color="#627dff"
                    dark
                    @click.stop="handleButtonClick"
                  >
                    <v-icon> mdi-function-variant </v-icon>
                  </v-btn>
                </template>
                <template v-slot:message>
                  <div>{{ "Activate extended view" }}</div>
                </template>
              </m-tooltip>
            </div>
            <v-card class="mx-auto" :ripple="false" v-if="showList">
              <v-toolbar>
                <v-toolbar-title>Write formula</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  class="mx-2"
                  fab
                  x-small
                  color="#627dff"
                  dark
                  @click="handleCloseList"
                >
                  <v-icon dark> mdi-alpha-x </v-icon>
                </v-btn>
              </v-toolbar>
              <v-list
                style="margin-bottom: 2%"
                width="350px"
                max-height="400px"
                class="overflow-y-auto"
              >
                <v-list-item
                  v-for="(item, index) in filteredList"
                  :key="item.name"
                  style="box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); height: 90px"
                  @click="handleListItemClick(item)"
                  @mouseover="hoveredIndex = index"
                >
                  <v-list-item-content>
                    <div>
                      {{ index + 1 + ". " + item.name + " " + item.category }}
                    </div>
                    <div v-if="hoveredIndex === index">
                      {{ getShortDescription(item.description.at(0)) }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <div style="background-color: #c0ccff">
                <v-btn color="#627dff" dark @click="handleCloseList">
                  <v-icon> mdi-check </v-icon>
                </v-btn>
              </div>
            </v-card>
          </div>
          <div class="divForBrackets" id="div" ref="div" v-if="showDiv">
            <span
              class="fixDiv"
              ref="coloredSpan"
              v-if="showDiv"
              :style="{ backgroundColor: isDivHovered ? '#627DFF' : '#c0ccff' }"
              @mouseover="handleMouseOverSpan"
              @mouseleave="handleMouseLeaveSpan"
            >
              {{ divText }}
              <!-- Display divText content here -->
            </span>
            <span class="div-button-extend-example">
              <button
                id="btn"
                class="btnExample"
                @click.stop="displayExampleAndDescription"
              >
                <m-tooltip top>
                  <template v-slot:element>
                    <img
                      v-if="flagDivExample"
                      style="width: 24px; margin-top: -5px"
                      src="@/assets/downArrow.png"
                      alt="Description of the image"
                    />
                    <img
                      v-else
                      style="width: 15px; margin-top: -5px"
                      src="@/assets/upArrow.png"
                      alt="Description of the image"
                    />
                  </template>
                  <template v-slot:message>
                    <div>
                      {{ "Extend" }}
                    </div>
                  </template>
                </m-tooltip>
              </button>
            </span>
            <div v-if="showExampleDiv" id="showExampleDiv" class="example-div">
              <div>
                <div class="titleDiv">Example</div>
                <div>
                  {{ exampleDivText }}
                </div>
                <v-divider></v-divider>
                <div class="titleDiv">Description</div>
                <div>
                  {{ descriptionDivText }}
                </div>
                <v-divider></v-divider>
                <m-tooltip top>
                  <template v-slot:element>
                    <div class="titleDiv">
                      <a
                        style="color: grey"
                        target="_blank"
                        href="https://machinations.io/docs/math-js-functions"
                        >Find more</a
                      >
                    </div>
                  </template>
                  <template v-slot:message>
                    <div>{{ "Do you want to know more about this?" }}</div>
                  </template>
                </m-tooltip>
              </div>
            </div>
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
import { mathFunctionModel } from "../models/mathFunction.model";

import MTooltip from "@axten/m-tooltip";

export default defineComponent({
  components: {
    MTooltip,
    ListContainer,
  },
  data() {
    return {
      hoveredIndex: 0,

      message: "",
      searchText: "",
      showList: false,
      letter: "",
      searchTextCopy: "",
      showDiv: false,
      divText: "text",
      flagForBracket: false,
      showExampleDiv: false,
      exampleDivText: "",
      flagDivExample: false,
      descriptionDivText: "",
      wordPosition: 0,
      inputString: "",
      positionToColor: 2,
      coloredText: "",
      selectedColor: "red",
      isDivHovered: false,
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
  watch: {
    divText: {
      handler: "colorizeWord",
      immediate: true,
    },
  },
  methods: {
    handleMouseOverSpan() {
      this.isDivHovered = true;
    },
    handleMouseLeaveSpan() {
      this.isDivHovered = false;
    },
    getShortDescription(description: string | undefined): string {
      let descr: string = description as string;
      if (descr.length > 60) {
        description = descr.slice(0, 60) + "...";
      }
      return description as string;
    },
    handleListItemClick(item: mathFunctionModel) {
      this.searchText = item.name.toString() + "(";
      this.descriptionDivText = item.description.toString();
      this.exampleDivText += item.examples[0] + " , " + item.examples[1];
      this.divText = item.syntax.toString();
      this.showList = false;
      this.showDiv = true;
      this.showExampleDiv = false;
      this.colorizeWord();
    },
    handleButtonClick() {
      // Method to handle button click event
      this.showList = true; // Show the list when the button is clicked
      this.flagDivExample = false;
      this.showDiv = false;
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
          console.log(this.filteredList[i]);
          if (finalResult == this.filteredList[i].name) {
            this.descriptionDivText =
              this.filteredList[i].description.toString();
            this.exampleDivText +=
              this.filteredList[i].examples[0] +
              " , " +
              this.filteredList[i].examples[1];
            this.divText = this.filteredList[i].syntax.toString();
            this.searchText += finalResult + "(";
            this.showList = false;
            this.showDiv = true;
            this.flagDivExample = this.showExampleDiv = false;
            this.handleMouseOverSpan();

            // Use this.$nextTick to ensure the DOM is updated before accessing the divForBrackets element
            this.$nextTick(() => {
              const divElement = document.getElementById("div");
              if (divElement) {
                divElement.style.color = "black";
              }
            });
          }
        }
      }
    },
    handleCloseList() {
      // Method to close the list
      this.showList = false; // Hide the list
    },
    displayExampleAndDescription() {
      if (this.flagDivExample) {
        this.showList = false;
        this.showDiv = true;
        this.showExampleDiv = false;
        this.flagDivExample = false;
      } else {
        this.showList = false;
        this.showDiv = true;
        this.showExampleDiv = true;
        this.flagDivExample = true;
      } // Show the black div when the button is clicked

      // Use this.$nextTick to ensure the DOM is updated before accessing the divForBrackets element
    },
    handleInputChange() {
      this.letter = this.searchText.slice(-1); // Update the searchText
      //If in the input is typed (, we are searching for a possible function with the name of the searchText and
      // append its syntax to the input
      if (this.letter == ")") {
        this.$nextTick(() => {
          this.showDiv = false;
          this.showList = true;
          this.handleMouseLeaveSpan();
        });
      }
      if (this.letter === "(") {
        this.flagDivExample = false;
        // Remove the "(" character from the searchText
        this.searchText = this.searchText.slice(0, -1);

        // Check if the searchText matches the name of any item in the filteredList
        const selectedItem = this.filteredList.find(
          (item) => item.name === this.searchText
        );

        if (selectedItem) {
          // If a match is found, update the divText with the syntax and show the div
          this.descriptionDivText = selectedItem.description.toString();
          this.exampleDivText +=
            selectedItem.examples[0] + " , " + selectedItem.examples[1];
          this.divText = selectedItem.syntax.toString();
          this.showList = false;
          this.showDiv = true;
          this.handleMouseOverSpan();
          this.showExampleDiv = false;

          // Use this.$nextTick to ensure the DOM is updated before accessing the divForBrackets element
          this.$nextTick(() => {
            const divElement = document.getElementById("div");
            if (divElement) {
              divElement.style.color = "black";
            }
          });
        }
      }
    },
    colorizeWord(): void {
      const spanElement = this.$refs.coloredSpan;
      if (spanElement instanceof HTMLElement) {
        const words = this.divText.split(" ");
        for (let i = 0; i < words.length; i++) {
          if (i === this.wordPosition) {
            words[
              i
            ] = `<span style="color: ${this.selectedColor};">${words[i]}</span>`;
          }
        }
        spanElement.innerHTML = words.join(" ");
        this.exampleDivText = words.join(" "); // Update exampleDivText with modified divText
        this.descriptionDivText = words.join(" "); // Update descriptionDivText with modified divText
      }
    },
  },
});
</script>

<style>
.v-card--link:before {
  background: none;
}

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
  margin: 20px;
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
  padding-top: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Add a subtle box-shadow */
}

.list {
  display: block;
  width: 400px;
  /* Adjust the width of the list container */
  max-height: 400px;
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
  height: 90px;
}

.divForBrackets {
  background-color: #c0ccff;
  top: 200px;
  width: 398px;
  margin: 0 auto;
  padding: 20px;
  height: 100px;
}

.example-div {
  display: flex;
  background-color: rgba(243, 238, 238, 0.669);
  color: black;
  margin-top: 10px;
  /* Add white-space property to preserve line breaks and wrap text */
  white-space: pre-wrap;
  font-size: 18px;
  text-align: left;
  padding: 10px;
  font-size: 13px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
  /* Change flex-direction to row-reverse */
}

.btnExample {
  /* Change flex-direction to row-reverse */
  margin-left: 200px;
  position: absolute;
  /* Set the top position to 50px */
  width: 100px;
  /* Set an appropriate width for the button */
  background: transparent;
}

.v-divider {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 347px;

  border-color: black;
  /* Set the color of the divider line */
}

.div-button-extend-example {
  width: 10px;
}

.main-container {
  display: flex;
  flex-direction: column;
}

span.fixDiv {
  display: inline-block;
  width: 110px;
  font-size: 13px;
  /*max-width: 100px;*/
  white-space: normal;
  overflow: hidden;
}

.container {
  display: flex;
  flex-direction: column;
}

.input-container,
.divForBrackets {
  flex: 1;
  min-height: 100px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btnExample {
  background-color: transparent;
  cursor: pointer;
  border: none;
}

.btnExample img {
  width: 21px;
  transition: transform 0.3s ease;
}

.btnExample img:last-child {
  transform: rotate(180deg);
}

.titleDiv {
  color: grey;
  font-size: 13px;
}
a {
  color: grey;
}
</style>
