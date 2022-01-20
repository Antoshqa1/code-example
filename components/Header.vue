<template>
  <v-app-bar app flat height="66" color="white" class="border">
    <v-app-bar-nav-icon
      v-if="authenticated"
      @click="$emit('open-drawer')"
    ></v-app-bar-nav-icon>
    <v-toolbar-title><router-link class="" to="/">ITMIX</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <div>
      <div class="">
        <div class="d-flex justify-space-between flex-row align-center">
          <template v-if="!authenticated">
            <v-btn to="/login" retain-focus-on-click plain depressed>Login</v-btn>
            <v-btn to="/register" retain-focus-on-click plain depressed>Register</v-btn>
          </template>

          <template v-else class="d-flex align-center">
            <v-btn retain-focus-on-click plain to="/dashboard" depressed class="white"
              >Dashboard</v-btn
            >
            <v-btn retain-focus-on-click plain to="/user" depressed class="white"
              >User</v-btn
            >
            <v-btn
              retain-focus-on-click
              plain
              v-if="authenticated"
              to="/admin"
              depressed
              class="white"
              >Admin</v-btn
            >
            <v-btn
              retain-focus-on-click
              plain
              depressed
              v-if="authenticated"
              @click.prevent="signOut"
              >sign out</v-btn
            >
            <!-- <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <div class="nav-link">
                  <v-btn depressed elevation="2" rounded v-bind="attrs" v-on="on">
                    {{ user.name }}
                  </v-btn>
                </div>
              </template>
              <v-list>
                <v-list-item @click="() => {}">
                  <v-list-item-title @click.prevent="signOut">Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
          </template>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      cabinets: null,
    };
  },
  name: "app-header",
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut",
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.push("/");
      });
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
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      allCabinets: "auth/allCabinets",
      user: "auth/user",
    }),
  },
  mounted() {
    if (this.authenticated) {
      axios
        .post("/api/getAllCabinets", {
          cabinetsId: this.allCabinets,
        })
        .then((response) => {
          this.cabinets = response.data;
        });
    }
  },
};
</script>

<style scoped>
.border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
</style>
