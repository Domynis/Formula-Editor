<template>
  <div>
    {{ message }}
    <p>Message is: {{ message }}</p>
    <input v-model="message" placeholder="edit me" />
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
};
</script>

<style>
/* Optional CSS styles for your component */
</style>
