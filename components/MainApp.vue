<template>
  <v-app>
    <LeftSideMenu v-if="authenticated" :drawer="drawer"></LeftSideMenu>

    <Header v-on:open-drawer="drawer = !drawer"></Header>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
import Header from "./Header.vue";
import LeftSideMenu from "./LeftSideMenu.vue";

import { mapGetters } from "vuex";

export default {
  name: "main-App",
  components: { Header, LeftSideMenu },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
    }),
  },
};
</script>
