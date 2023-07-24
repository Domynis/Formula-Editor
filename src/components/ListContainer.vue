<!--list that contains each function-->
<template>
  <div class="list-container" v-if="showList">
    <v-list class="list">
      <div class="list-item-header">
        <div class="formula">Write Formula</div>
        <button @click="handleCloseList" class="close-button" id ="#button" > <img style="width: 30px" :src="require('@/assets/close.png')" alt="My Photo" /></button>
      </div>
      <v-list-item v-for="item in filteredList" :key="item.id" class="custom-list-item list-item">
        <v-list-item-content>
          <div>{{ item.id + ". " + item.text + " " + item.category }}</div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  props: {
    listItems: {
      type: Array,
      default: () => [],
    },
    searchText: String,
    showList: Boolean,
    filteredList: Array,
  },
  /*display the list only when it is the case (the button for the extended part is clicked)*/
  watch: {
    searchText(newVal) {
      if (this.showList) {
        this.filteredList = this.listItems.filter((item) =>
          item.text.toLowerCase().startsWith(newVal.toLowerCase())
        );
      }
    },
  },
  /*when the button is clicked, the list will no longer be displayed.*/
  methods: {
    handleCloseList() {
      console.log("Hello");
      console.log(document.getElementById("#button"));
      
    },
  },
};
</script>

<style>
.list-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 10px;
  position: relative;
}

.formula {
  position: relative;
}

.formula::before {
  content: "";
  position: absolute;
  top: 170%; /* Adjust the vertical position as needed */
  left: 0;
  margin: 0px;
  height: 3px; /* Adjust the height of the horizontal line */
  width: calc(390%); /* Adjust the width of the horizontal line */
  background-color: #f1f1f1; /* Set the color of the horizontal line */
}

.close-button {
  width: 40px; /*width and height of the button*/
  height: 30px;
}

</style>