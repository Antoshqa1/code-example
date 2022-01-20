<template>
  <div class="container">
    <h1>Admin</h1>
    <v-toolbar>
      <router-link to="/admin/users">
        <v-btn depressed elevation="2" rounded class="mr-2">Users</v-btn>
      </router-link>
      <router-link to="/admin/groups">
        <v-btn depressed elevation="2" rounded> Groups </v-btn>
      </router-link>
    </v-toolbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     if (vm.$store.getters.currentUser) {
  //       if (vm.$store.getters.currentUser.role_id == 1) {
  //         console.log(1);
  //         vm.$router.push({ path: "/admin" });
  //       }
  //     } else {
  //       vm.$router.push({ path: "/login" });
  //     }
  //   });
  // },
};
</script>
