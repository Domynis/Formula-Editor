<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="main-container">
          <div class="input-container">
            <div class="input-button-container">
              <v-text-field class="mx-2 red-input" v-model="searchText" @input="handleInputChange"
                placeholder="Search items"></v-text-field>

              <m-tooltip top>
                <template v-slot:element>
                  <v-btn class="mx-2" small fab color="#627dff" dark @click.stop="handleButtonClick">
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
                <v-toolbar-title style="font-size: 14px; font-weight: bold">Write formula</v-toolbar-title>
                <v-spacer></v-spacer>
                <m-tooltip top>
                  <template v-slot:element>
                    <v-btn class="mx-2" fab x-small color="#627dff" dark @click="handleCloseList">
                      <v-icon dark> mdi-alpha-x </v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:message>
                    <div>{{ "Close extended view" }}</div>
                  </template>
                </m-tooltip>
              </v-toolbar>
              <v-list width="25rem" max-height="28rem" class="overflow-y-auto py-0">
                <template v-for="(item, index) in filteredList" @key="item.name">
                  <v-list-item class="pl-0" style="height: 5rem; font-size: 12px" @click="handleMouseOver"
                    :key="item.name" @mouseover="hoveredIndex = index">
                    <v-list-item-content>
                      <v-row style="height: 5rem">
                        <v-col cols="2" style="
                            background-color: #dfe8ff;
                            text-align: right;
                            color: #627dff;
                          ">
                          {{ index + 1 }}
                        </v-col>
                        <v-col>
                          {{ item.name + " " + item.category }}
                          <div v-if="hoveredIndex === index">
                            {{ getShortDescription(item.description.at(0)) }}
                          </div>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list>
              <v-container width="25rem" style="background-color: #dfe8ff">
                <v-row style="height: 2.3rem">
                  <v-col cols="2" class="pa-0">
                    <m-tooltip bottom>
                      <template v-slot:element>
                        <v-btn small style="min-width: 3.35rem; min-height: 2.3rem; border-radius: 0px; box-shadow: none;"
                          color="#627dff" dark @click="handleCloseList">
                          <v-icon> mdi-check </v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:message>
                        <div>{{ "Close extended view" }}</div>
                      </template>
                    </m-tooltip>
                  </v-col>
                  <v-col class="py-1 text-right">
                    <m-tooltip bottom>
                      <template v-slot:element>
                        <a style="font-size: 12px" href="https://machinations.io/docs/math-js-functions">Help
                          Documentation</a>
                      </template>
                      <template v-slot:message>
                        <div>{{ "Do you want to know more about this?" }}</div>
                      </template>
                    </m-tooltip>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </div>
          <div class="divForBrackets" id="div" ref="div" v-if="showDiv" @click="handleMouseOver">
            <v-row>
              <v-col align-start>
                <div id="syntaxDiv"></div>
              </v-col>
              <v-col class="text-end">
                <m-tooltip bottom>
                  <template v-slot:element>
                    <v-btn class="mx-2" fab x-small color="#627dff" dark @click.stop="displayExampleAndDescription">
                      <v-icon v-if="!flagDivExample"> mdi-arrow-down-bold </v-icon>
                      <v-icon v-if="flagDivExample"> mdi-arrow-up-bold </v-icon>
                    </v-btn>
                  </template>
                  <template v-slot:message>
                    <div>{{ flagDivExample ? "Minimize details" : "Extend details" }}</div>
                  </template>
                </m-tooltip>

              </v-col>
            </v-row>
            <div v-if="showExampleDiv" id="showExampleDiv" class="example-div">
              <div>
                <div class="titleDiv">Example</div>
                <div>
                  {{ exampleDivText }}
                </div>
                <v-divider></v-divider>
                <div class="titleDiv">Description</div>
                <div style="padding-right: 0.1rem">
                  {{ descriptionDivText }}
                </div>
                <v-divider></v-divider>
                <m-tooltip bottom>
                  <template v-slot:element>
                    <div class="titleDiv">
                      <a style="color: grey" target="_blank" href="https://machinations.io/docs/math-js-functions">Find
                        more</a>
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
      params: [] as string[],
      param: [] as string[],
      listOfParam: [] as string[],
      paramNumber: 0,
      comaNr: 0,
      bracketFlag: false,
      flagSearchIsFromHovered: false,
      isBracket: false,
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
    handleMouseOverSpan() {
      this.isDivHovered = true;
    },
    handleMouseLeaveSpan() {
      this.isDivHovered = false;
    },
    getShortDescription(description: string | undefined): string {
      let descr: string = description as string;
      const maxLength = 150;
      if (descr.length > maxLength) {
        description = descr.slice(0, maxLength) + "...";
      }
      return description as string;
    },
    handleListItemClick(item: mathFunctionModel) {
      this.searchText = item.name.toString() + "(";
      this.descriptionDivText = item.description.toString();
      this.exampleDivText += item.examples[0] + " , " + item.examples[1];
      this.divText = item.syntax[0].toString();
      this.showList = false;
      this.showDiv = true;
      this.showExampleDiv = false;
      //this.colorizeWord();
    },
    handleButtonClick() {
      // Method to handle button click event
      this.showList = true; // Show the list when the button is clicked
      this.flagDivExample = false;
      this.showDiv = false;
    },
    handleMouseOver(event: Event) {
      //!!should change function name as it does not serve the same purpose as in the beginning!!
      if (!this.showDiv)
        if (event.target instanceof HTMLElement) {
          // Type guard to ensure event.target is not null
          // Take the html element that is clicked and obtain the name of the function
          this.showList = true; // Show the list when mouse is over the component
          const elementMouseOver = event.target;
          const textContent = elementMouseOver.textContent!.trim(); // Use ! to assert that textContent is not null
          const firstSpaceIndex = textContent.indexOf(" ");
          const finalResult = textContent.substring(0, firstSpaceIndex);

          //search for a match in the filteredList, if found display the syntax for the function in the input
          for (let i = 0; i < this.filteredList.length; i++) {
            if (finalResult == this.filteredList[i].name) {
              this.isBracket = true;
              this.flagSearchIsFromHovered = true;
              this.descriptionDivText = "";
              this.descriptionDivText =
                this.filteredList[i].description.toString();
              this.exampleDivText = "";
              this.exampleDivText +=
                this.filteredList[i].examples[0] +
                " , " +
                this.filteredList[i].examples[1];
              this.divText = this.filteredList[i].syntax[0].toString();
              this.searchText = "";
              this.searchText += finalResult + "(";
              this.showList = false;
              this.showDiv = true;
              this.flagDivExample = this.showExampleDiv = false;
              //this.handleMouseOverSpan();
              this.flagForBracket = true;

              // this.getParameters();
              this.function();
              this.flagForBracket = true;
              this.flagSearchIsFromHovered = true;
              //this.handleInputChange();

              break;

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
      this.hoveredIndex = 0;
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
    getParameters() {
      this.params = this.divText.split("(");
      this.$nextTick(() => {
        const divElement = document.getElementById("syntaxDiv");
        if (divElement) {
          // Create a new span element for the first part
          const newSpan = document.createElement("span");
          // Set the text content of the span element (replace "Your Text Here" with your desired content)
          newSpan.textContent = this.params[0] + "(";
          // Add any additional styles or attributes to the new span if needed
          newSpan.style.color = "black";
          // Append the new span to the syntaxDiv
          divElement.appendChild(newSpan);
          this.param = this.params[1].split(")");
          this.listOfParam = this.param[0].split(",");

          for (let i = 0; i < this.listOfParam.length; i = i + 1) {
            // Create a new span element for each part
            const span = document.createElement("span");
            span.setAttribute("id", "span-" + i);
            // Set the text content of the span element
            span.textContent = this.listOfParam[i];
            // Add any additional styles or attributes to the span if needed
            span.style.color = "black";
            // Append the span to the syntaxDiv
            divElement.appendChild(span);

            if (i < this.listOfParam.length - 1) {
              const span1 = document.createElement("span");
              // Set the text content of the span element
              span1.textContent = ",";
              // Add any additional styles or attributes to the span if needed
              span1.style.color = "black";
              // Append the span to the syntaxDiv
              divElement.appendChild(span1);
            }
          }

          const closingParenthesisSpan = document.createElement("span");
          // Set the text content of the closing parenthesis span element
          closingParenthesisSpan.textContent = ")";
          // Add any additional styles or attributes to the closing parenthesis span if needed
          closingParenthesisSpan.style.color = "black";
          // Append the closing parenthesis span to the syntaxDiv
          divElement.appendChild(closingParenthesisSpan);
        }
      });
    },
    function() {
      this.showDiv = true;
      this.searchText = this.searchText.slice(0, -1);
      this.paramNumber = 0;

      this.bracketFlag = true;

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
        this.flagSearchIsFromHovered = true;
        this.$nextTick(() => {
          const divElement = document.getElementById("syntaxDiv");
          const spans = divElement?.querySelectorAll("span");
          if (spans) {
            spans.forEach((span) => {
              span.remove();
            });
          }
        });
        //this.paramNumber = 0;
        this.getParameters();

        // Use this.$nextTick to ensure the DOM is updated before accessing the divForBrackets element
      }
      // Use this.$nextTick to ensure the DOM is updated before accessing the divForBrackets element
    },
    handleInputChange() {
      this.bracketFlag = this.searchText.includes("(");
      if (this.searchText === "") {
        this.showDiv = false;
        return;
      }

      if (!this.searchText.includes("(")) {
        this.showDiv = false;
      }

      this.letter = this.searchText.slice(-1); // Update the searchText
      //If in the input is typed (, we are searching for a possible function with the name of the searchText and
      // append its syntax to the input
      if (this.letter == ")") {
        this.$nextTick(() => {
          this.showDiv = false;
          this.handleMouseLeaveSpan();
          this.isBracket = false;
        });
      }

      if (this.searchText.length == 0) this.isBracket = false;
      if (this.letter === "(" /*&& !this.isBracket*/) {
        if (!this.flagSearchIsFromHovered) {
          this.$nextTick(() => {
            const divElement = document.getElementById("syntaxDiv");
            const spans = divElement?.querySelectorAll("span");
            if (spans) {
              spans.forEach((span) => {
                span.remove();
              });
            }
          });
          //this.paramNumber = 0;
        }
        this.isBracket = true;
        //this.showDiv = true;
        this.searchText = this.searchText.slice(0, -1);
        this.paramNumber = 0;

        this.bracketFlag = true;

        const selectedItem = this.filteredList.find(
          (item) => item.name === this.searchText
        );

        if (selectedItem) {
          // If a match is found, update the divText with the syntax and show the div
          this.descriptionDivText = "";
          this.descriptionDivText = selectedItem.description.toString();
          this.exampleDivText = "";
          this.exampleDivText +=
            selectedItem.examples[0] + " , " + selectedItem.examples[1];
          this.divText = selectedItem.syntax.toString();
          this.showList = false;
          this.showDiv = true;
          this.handleMouseOverSpan();
          this.showExampleDiv = false;
          if (!this.flagSearchIsFromHovered) this.getParameters();
          else {
            this.flagSearchIsFromHovered = false;
          }

          // Use this.$nextTick to ensure the DOM is updated before accessing the divForBrackets element
        }
        this.searchText += "(";
      }
      if (this.bracketFlag) {
        this.searchText += this.letter;
        this.$nextTick(() => {
          if (this.comaNr != 0) {
            const divElement = document.getElementById(
              "span-" + (this.comaNr - 1).toString()
            );
            if (divElement) {
              divElement.style.backgroundColor = "#c0ccff";
            }
          }

          const divElement = document.getElementById("span-" + this.comaNr);
          if (divElement) {
            divElement.style.backgroundColor = "#627ddf";
          }
        });

        if (this.letter === ",") {
          this.comaNr++;
        }
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
          //this.showDiv = true;
          this.handleMouseOverSpan();
          this.showExampleDiv = false;
          //this.getParameters();

          // Use this.$nextTick to ensure the DOM is updated before accessing the divForBrackets element
        }
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
  width: 450px;
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

.titleDiv {
  color: grey;
  font-size: 13px;
}

a {
  color: grey;
}
</style>
