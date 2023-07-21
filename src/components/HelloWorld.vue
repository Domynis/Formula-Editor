
<template>
  <v-container>
    <v-row align="center"> 
      <v-col>
        <div class="input-container">
          <div class="input-button-container">
            <v-text-field v-model="searchText" placeholder="Edit me" class="red-input" />
            <button @click="handleButtonClick" class="arrow-button">
              <img style="width:30px" :src="require('@/assets/independent-variable.png')" alt="My Photo" /></button>
          </div>
          <div class="list-container" v-if="showList">
            <v-list class="list">
              <v-list-item v-for="item in filteredList" :key="item.id" class="custom-list-item">
                <v-list-item-content>{{ item.text }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </div>
      </v-col>
      <v-col>
        <div class="input-container">
          <getMathJSONButton/>
        </div>

      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import getMathJSONButton from "./getMathJSONButton.vue";
export default {
  name: "hello-world",
  components: {
    getMathJSONButton,
  },
  data() {
    return {
      message: "",
      searchText: "",
      showList: false, // Add a flag to control whether to show the list or not
      filteredList: [],
    };
  },
  props: {
    listItems: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/hello")
      .then((response) => {
        this.message = response.data.message;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  watch: {
    searchText() {
      if (this.showList) {
        // Perform filtering only when the flag is true
        this.filteredList = this.listItems.filter((item) =>
          item.text.toLowerCase().startsWith(this.searchText.toLowerCase())
        );
      }
    },
  },
  methods: {
    handleButtonClick() {
      this.showList = true; // Set the flag to true when the button is clicked
      // Perform initial filtering when the button is clicked
      this.filteredList = this.listItems.filter((item) =>
        item.text.toLowerCase().startsWith(this.searchText.toLowerCase())
      );
    },
  },
};
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
}

.input-button-container {
  display: flex;
  align-items: center;
  /* Align items vertically in the container */
  width: 100%;
  margin-bottom: 10px;
  /* Add some space between the input and the list */
}

.red-input {
  flex: 1;
  border: none;
  border-radius: 10px;
  /* Make the input field rounded */
  background-color: #f1f1f1;
  padding: 10px;
  /* Adjust the padding for better alignment */
  margin-top: 20px;
}

.arrow-button {
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  min-width: 40px;
  /* Adjust the min-width to make the button wider */
  cursor: pointer;
  color: #666;
  font-weight: bold;
  border-radius: 0px 10px 10px 0px;
  /* Make the button rounded */
}

.list {
  display: block;
  width: 400px;
}
</style>
