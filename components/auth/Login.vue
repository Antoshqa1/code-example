<template>
  <div>
    <div class="d-flex justify-center align-start card-container pt-10">
      <v-card class="d-flex flex-column justify-center p-3" width="400" elevation="5">
        <v-card-title class="p-0">Login </v-card-title>
        <v-form @submit.prevent="authenticate">
          <!-- <div class="form-group row" v-if="authError">
              <p class="error">
                {{ authError }}
              </p>
            </div> -->
          <v-text-field type="email" v-model="formLogin.email" placeholder="Email">
          </v-text-field>
          <v-text-field
            type="password"
            v-model="formLogin.password"
            placeholder="Password"
          >
          </v-text-field>
          <v-btn retain-focus-on-click plain depressed type="submit" class="p-0"
            >Login</v-btn
          >
        </v-form>
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
      cabinetsAll: null,
      error: null,
    };
  },
  methods: {
    getAllCabinets() {
      axios
        .post("/api/getAllCabinets", {
          allCabinets: this.allCabinets,
        })
        .then((response) => {
          this.cabinetsAll = response.data;
        });
    },

    ...mapActions({
      signIn: "auth/signIn",
    }),
    authenticate() {
      this.signIn(this.formLogin).then(() => {
        this.getAllCabinets();

        this.$router.push("user").catch((e) => {
          console.log(e);
        });
      });
    },
  },
  computed: {
    ...mapGetters({
      allCabinets: "auth/allCabinets",
    }),
  },
};
</script>
<style scoped>
.error {
  text-align: center;
  color: red;
}
</style>
