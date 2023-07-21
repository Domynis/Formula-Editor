<!-- <template>
  <div class="get-math-api"> 
      <h1>Requesting API goodies</h1>
  </div>
</template>


<script lang="ts">
  import { defineComponent } from "vue";
  import axios from 'axios'
  

 

  export default defineComponent({
    name: "get-math-api",
    methods: {
      getMath() {
      let a = null;
      axios.get("http://api.mathjs.org/v4/?expr=0").then(resp => {
        a = resp.data;
        console.log(a);
      }).catch(error => {
        console.log(error);
      });
     },
     getExpress() {
      let message = null;
      axios.get('http://localhost:3000/api/hello/')
      .then(response => {
        message = response.data.message;
        console.log(message);
      })
      .catch(error => {
        console.error(error);
      });
     },
    },
    mounted (){
      console.log('hello from app');
      this.getExpress();
    },
  });

</script>

<style scoped lang="scss">
  .get-math-api {
    align-content: center;
  }
</style> -->
