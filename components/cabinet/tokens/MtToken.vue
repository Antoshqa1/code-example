<template>
  <div>
    <div>MYTARGET TOKEN</div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      MTcode: null,
      Mttoken: null,
    };
  },
  mounted() {
    if (document.location.href) {
      this.MTcode = document.location.href.split("&")[0].split("=")[1];
      axios
        .post("/api/access/mttoken", {
          code: this.MTcode,
        })
        .then((response) => {
          this.Mttoken = response.data.access_token;
        })
        .then(() => {
          // localStorage.removeItem("mtToken");
          // localStorage.setItem("mtToken", this.Mttoken);
          this.$store.commit("tokens/SET_MTTOKEN", this.Mttoken);
          this.createMtToken();
        })
        .then(() => {
          this.$router.push("/cabinet/accesses");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  methods: {
    ...mapMutations(["SET_MTTOKEN"]),
    createMtToken() {
      axios
        .post("/api/token", {
          cabinet_id: this.currentCabinet,
          platform_id: 6,
          token: this.Mttoken,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
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
