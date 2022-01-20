<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list-item class="drawer-header" v-if="authenticated">
      <v-list-item-content>
        <v-list-item-title class="title"> {{ cabinet.name }} </v-list-item-title>
        <v-list-item-subtitle> {{ user.name }} </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-else class="drawer-header d-flex justify-center align-center">
      <v-btn to="/login" depressed>Login</v-btn>
    </v-list-item>

    <v-divider class="m-0"></v-divider>
    <v-list dense nav v-if="authenticated" shaped>
      <v-list-item exact link :to="link.link" v-for="link in links" :key="link.name">
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      cabinet: "",
      links: [
        {
          name: "Статистика",
          icon: "mdi-table",
          link: "/cabinet",
        },
        {
          name: "Клиенты кабинета",
          icon: "mdi-account-multiple",
          link: "/cabinet/clients",
        },
        {
          name: "Пользователи кабинета",
          icon: "mdi-account-group",
          link: "/cabinet/users",
        },
        {
          name: "Доступы",
          icon: "mdi-account-check",
          link: "/cabinet/accesses",
        },
        {
          name: "MyTarget",
          icon: "mdi-target-account",
          link: "/cabinet/mytarget",
        },
      ],
    };
  },
  props: ["drawer"],
  mounted() {
    axios
      .post("/api/getCurrentCabinetById", {
        cabinetId: this.currentCabinet,
      })
      .then((res) => {
        this.cabinet = res.data;
        console.log(this.cabinet);
      });
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      allCabinets: "auth/allCabinets",
      user: "auth/user",
      currentCabinet: "auth/currentCabinet",
    }),
  },
};
</script>

<style scoped>
.drawer-header {
  height: 150px;
}
</style>
