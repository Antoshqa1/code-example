<template>
  <div class="login row justify-content-center pt-10">
    <v-card elevation="5" width="600" class="p-3">
      <v-card-title class="p-0">Register </v-card-title>
      <v-form @submit.prevent="registered">
        <v-text-field v-model="formRegister.name" label="Name"> </v-text-field>
        <v-text-field v-model="formRegister.email" label="Email"> </v-text-field>
        <v-text-field v-model="formRegister.password" label="Password"> </v-text-field>
        <!-- <v-text-field v-model="formRegister.cabinetName" label="Cabinet name"></v-text-field> -->
        <v-btn
          retain-focus-on-click
          plain
          depressed
          type="submit"
          value="Register"
          class="p-0"
        >
          Register
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      formRegister: {
        name: "",
        email: "",
        password: "",
        // cabinetName: "",
      },
      // authUser: {
      //   email: this.formRegister.email,
      //   password: this.formRegister.password,
      // },
      error: null,
    };
  },
  methods: {
    registered() {
      // registerUser(this.formRegister);
      axios
        .post("/api/auth/register", {
          name: this.formRegister.name,
          email: this.formRegister.email,
          password: this.formRegister.password,
          // cabinetName: this.formRegister.cabinetName,
        })
        .then((response) => {
          console.log(response.data);
          this.authUser = {
            email: response.data.email,
            password: response.data.password,
          };
        })
        .then(() => {
          this.authenticate(this.authUser);
        });
      // .then((res) => {

      //   this.$router.push({ path: "/login" });
      // })
      // .catch((error) => {
      //   this.$store.commit("registerFailed", { error });
      // });
    },
    authenticate(user) {
      this.signIn(user)
        .then(() => {
          this.$router.push("user");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    ...mapActions({
      signIn: "auth/signIn",
      register: "auth/register",
    }),
  },
  computed: {
    regError() {
      return this.$store.getters.regError;
    },
    // authUser: {
    //   email: this.formRegister.email,
    //   password: this.formRegister.password,
    // },
    authUser() {
      return {
        email: this.formRegister.email,
        password: this.formRegister.password,
      };
    },
  },
};
</script>
<style scoped>
.error {
  text-align: center;
  color: red;
}
</style>
