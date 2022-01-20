<template>
  <div>
    <div>YMTOKEN</div>
    <div>VKTOYMTOKENKEN</div>
    <div>YMTOKEN</div>
    <div>VKTOKEN</div>
    <div>YMTOKEN</div>
    <div>VKTOKEN</div>
    <div>YMTOKEN</div>
    <div>YMTOKENYMTOKEN</div>
    <div>YMTOKENYMTOKENYMTOKENYMTOKEN</div>
    <div>VKTOKEN</div>
    <div>VKTOKEN</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      VKtoken: null,
    };
  },
  mounted() {
    if (document.location.hash) {
      this.VKtoken = document.location.hash.split("&")[0].split("=")[1];
      localStorage.removeItem("vkToken");
      localStorage.setItem("vkToken", this.VKtoken);
      this.$store.commit("tokens/SET_VKTOKEN", this.VKtoken);
      this.createVkToken();
    }
    this.$router.push("/cabinet");
  },
  methods: {
    ...mapMutations(["SET_VKTOKEN"]),
    createVkToken() {
      axios
        .post("/api/token", {
          cabinet_id: this.currentCabinet,
          platform_id: 5,
          token: this.VKtoken,
        })
        .then((response) => {
          console.log(response);
        });
    },
  },
  computed: {
    currentCabinet() {
      return this.$store.state.auth.currentCabinet;
    },
  },
};
</script>

<style></style>
