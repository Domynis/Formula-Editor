<template>
  <div class="input-container">
    <!--the input with its right button-->
    <v-text-field v-model="message" placeholder="Edit me" class="red-input" />
    <button @click="handleButtonClick" class="arrow-button">   X</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    // Make the request to the backend when the component is mounted
    axios
      .get("http://localhost:3000/api/hello")
      .then((response) => {
        this.message = response.data.message;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    handleButtonClick() {
      
      alert("Button Clicked!");
    },
  },
};
</script>

<style>
.input-container {
  margin: 50px;
  display: flex;
  align-items: center; /* Align items vertically in the container */
  background-color: #f1f1f1; 
  width: 400px; 
  height: 40px;
  border-radius: 10px 0px 0px 10px; 
}

.red-input {
  padding:20px;
  display: flex;
  align-items: center; /* Align items vertically */
  flex-direction: column; /* Display the content in a column */
  justify-content: center; /* Center the content vertically */
  flex: 1; /* Take up remaining space in the container */
  border: none; /* Remove the border */
  border-radius: 10px 0px 0px 10px; /* Make the input field rounded */
  background-color: #f1f1f1; 
  padding: 0 10px; 
}

.red-input input {
  margin-top: 20px; /* Add margin to the top of the input field */
  background-color: #f1f1f1;
  margin-right: 0px ;
}
.arrow-button {
  background-color: #f1f1f1;
  margin-top: 4px; 
  display: flex;
  justify-content: center;
  align-items: center;
  height: 74px;
  min-width: 40px; /* Adjust the min-width to make the button wider */
  cursor: pointer;
  color: #666; 
  font-weight: bold;
  border-radius: 0px 10px 10px 0px; /* Make the button rounded */
}
</style>
