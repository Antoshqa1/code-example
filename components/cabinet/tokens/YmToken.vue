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
      YMtoken: null,
    };
  },
  mounted() {
    if (document.location.hash) {
      this.YMtoken = document.location.hash.split("&")[0].split("=")[1];
      localStorage.removeItem("ymToken");
      localStorage.setItem("ymToken", this.YMtoken);
      this.$store.commit("tokens/SET_YMTOKEN", this.YMtoken);
    }
    this.createYmToken();
    this.$router.push("/cabinet");
  },
  methods: {
    ...mapMutations(["SET_YMTOKEN"]),
    createYmToken() {
      axios
        .post("/api/token", {
          cabinet_id: this.currentCabinet,
          platform_id: 1,
          token: this.YMtoken,
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
