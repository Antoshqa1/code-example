<template>
  <div>
    <v-toolbar dense>
      <div class="container d-flex">
        <v-toolbar-title>Панель пользователя</v-toolbar-title>
        <v-spacer></v-spacer>
        <router-link style="text-decoration: none" to="/user/statistics">
          <v-btn rounded text>Statistics</v-btn>
        </router-link>
        <router-link style="text-decoration: none" to="/user/mytarget">
          <v-btn rounded text>myTarget</v-btn>
        </router-link>
        <router-link style="text-decoration: none" to="/user/vk">
          <v-btn rounded text>VK</v-btn>
        </router-link>
        <router-link style="text-decoration: none" to="/user/accesses">
          <v-btn rounded text>Доступы</v-btn>
        </router-link>
      </div>
    </v-toolbar>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      cabinetsAll: null,
    };
  },
  computed: {
    ...mapGetters({
      allCabinets: "auth/allCabinets",
      user: "auth/user",
    }),
  },
  methods: {
    authVk() {
      window.location.href =
        "https://oauth.vk.com/authorize?client_id=7710766&display=page&redirect_uri=http://127.0.0.1:8000/user/vk&scope=friends&response_type=token&v=5.126&state=123456&scope=ads,offline";
    },
    getAllCabinets() {
      axios
        .post("/api/getAllCabinets", {
          allCabinets: this.allCabinets,
        })
        .then((response) => {
          this.cabinetsAll = response.data;
        });
    },
  },
  mounted() {
    this.getAllCabinets();
  },
};
</script>
