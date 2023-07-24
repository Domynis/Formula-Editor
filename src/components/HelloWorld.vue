<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <div class="input-container">
          <div class="input-button-container">
            <v-text-field v-model="searchText" @input="handleInputChange" placeholder="Search items" class="red-input"></v-text-field>
            <button @click="handleButtonClick" class="arrow-button">
              <img style="width: 30px" :src="require('@/assets/independent-variable.png')" alt="My Photo" />
            </button>
          </div>
          <div class="list-container-wrapper" v-if="showList" @mouseover="handleMouseOver">
            <v-list class="list">
              <div class="list-item-header">
                <div class="formula">Write Formula</div>
                <button @click="handleCloseList" class="close-button" id="#button">
                  <img style="width: 30px" :src="require('@/assets/close.png')" alt="My Photo" />
                </button>
              </div>
              <v-list-item v-for="item in filteredList" :key="item.id" class="custom-list-item list-item">
                <v-list-item-content>
                  <div>{{ item.id + ". " + item.text + " " + item.category }}</div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListContainer from "./ListContainer.vue";
import axios from "axios";

interface ListItem {
  id: number;
  text: string;
  category: string;
}

export default defineComponent({
  name: "hello-world",
  components: {
    ListContainer,
  },
  data() {
    return {
      message: "",
      searchText: "",
      showList: false,
      filteredList: [] as ListItem[],
    };
  },
  props: {
    listItems: {
      type: Array as () => ListItem[],
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
    filteredList(): ListItem[] {
      // Computed property to filter the listItems based on the searchText
      return this.listItems.filter((item: ListItem) =>
        item.text.toLowerCase().startsWith(this.searchText.toLowerCase())
      );
    },
  },
  methods: {
    handleButtonClick() {
      // Method to handle button click event
      this.showList = true; // Show the list when the button is clicked
      this.filteredList = this.listItems.filter((item: ListItem) =>
        item.text.toLowerCase().startsWith(this.searchText.toLowerCase())
      ); // Filter the list based on the searchText
    },
    handleMouseOver() {
      // Method to handle mouse over event
      this.showList = true; // Show the list when mouse is over the component
    },
    handleCloseList() {
      // Method to close the list
      this.showList = false; // Hide the list
    },
    handleInputChange() {
      // Method to handle input change event
      this.filteredList = this.listItems.filter((item: ListItem) =>
        item.text.toLowerCase().startsWith(this.searchText.toLowerCase())
      ); // Filter the list based on the changed input value
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
  size:20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow */
  resize: none; /* Prevent the input field from being resizable */
  max-height: 7.5em; /* Limit the input field to a maximum of 5 lines (7.5em = 5 lines x 1.5em line-height) */
  overflow-y: auto; /* Enable vertical scrolling when content exceeds the maximum height */
}
.arrow-button {
  background-color: #f1f1f1;
  height: 30px;
  width: 30px;
  cursor: pointer;
  color: #666;
  font-weight: bold;
  border-radius: 50%; /* Make the button circular */
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow */
}

.list-container-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow */
}

.list {
  display: block;
  width: 400px; /* Adjust the width of the list container */
  max-height: 200px; /* Limit the maximum height to create a scrollable list */
  overflow-y: auto; /* Enable vertical scrolling when list exceeds the height */
  font-size: 10px;
}

.list-item {
  background-color: #ffffff; /* White background for each list item */
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box-shadow */
  height: 10px;
}
</style>
