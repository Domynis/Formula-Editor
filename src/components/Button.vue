
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



