<template>
  <v-container class="d-flex flex-column justify-space-between">
    <v-container class="px-0 d-flex flex-row align-center">
      <v-btn
        @click="
          openModifyingDialog(newDialogItem),
            (dialogTitle = 'Создать элемент'),
            (created = true)
        "
        >Создать</v-btn
      >
      <v-spacer></v-spacer>
      <v-text-field label="Поиск" v-model="query"></v-text-field>
    </v-container>
    <v-card
      class="w-90 my-2"
      max-width="100%"
      v-for="(userAccess, index) in search"
      :key="index"
    >
      <v-card-text>
        <p class="display-1 text--primary">{{ userAccess.name }}</p>
        <div class="text--primary">
          Login : {{ userAccess.login }}<br />
          Password : {{ userAccess.password }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="indigo lighten-2"
          @click="
            openModifyingDialog(userAccess),
              (dialogTitle = 'Изменить элемент'),
              (created = false)
          "
        >
          Изменить
        </v-btn>
        <v-btn text color="red accent-4" @click="deleteAccess(userAccess.id)">
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-form ref="form" v-model="valid" class="white pa-8" lazy-validation>
          <span class="headline">{{ dialogTitle }}</span>
          <v-text-field
            :rules="[(value) => !!value || 'Поле не должно быть пустым.']"
            :label="dialogItem.name"
            required
            v-model="newAccess.name"
          ></v-text-field>
          <v-text-field
            :rules="[(value) => !!value || 'Поле не должно быть пустым.']"
            :label="dialogItem.login"
            required
            v-model="newAccess.login"
          ></v-text-field>
          <v-text-field
            :rules="[(value) => !!value || 'Поле не должно быть пустым.']"
            :label="dialogItem.password"
            required
            v-model="newAccess.password"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-2" text @click="closeDialog"> Отменить </v-btn>
          <v-btn
            color="green darken-4"
            :disabled="!valid"
            text
            @click="sendAccess(newAccess, dialogItem.id)"
          >
            Сохранить
          </v-btn>
        </v-form>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    userAccesses: [],
    dialog: false,
    dialogItem: {},
    newAccess: {},
    valid: true,
    componentKey: 0,
    dialogTitle: "Изменить элемент",
    created: false,
    newDialogItem: {
      name: "Название",
      login: "Логин",
      password: "Пароль",
    },
    query: "",
    allAccesses: {},
  }),
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
    search() {
      var query = this.query;
      return this.userAccesses.filter(function (userAccess) {
        return userAccess.name.includes(query);
      });
    },
  },
  mounted() {
    this.getAccesses();
  },
  methods: {
    getAccesses() {
      axios
        .get("/api/access", { params: { id: this.user.id } })
        .then((res) => {
          this.userAccesses = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteAccess(id) {
      axios
        .delete("/api/access/" + id)
        .then((response) => {
          this.getAccesses();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModifyingDialog(userAccess) {
      this.dialog = true;
      this.dialogItem = userAccess;
    },
    sendAccess(newAccess, id) {
      if (this.created) {
        this.createAccess(newAccess);
      } else if (!this.created) {
        this.changeAccess(newAccess, id);
      }
    },
    createAccess(newAccess) {
      if (this.$refs.form.validate()) {
        axios
          .post("/api/access/", {
            login: this.newAccess.login,
            name: this.newAccess.name,
            password: this.newAccess.password,
            user_id: this.user.id,
          })
          .then((response) => {
            console.log(response);
            this.dialog = false;
            this.dialogItem = {};
            this.newAccess = {};
            this.$refs.form.resetValidation();
            this.getAccesses();
          });
      }
    },
    changeAccess(newAccess, id) {
      if (this.$refs.form.validate()) {
        axios
          .put("/api/access/" + id, {
            login: this.newAccess.login,
            password: this.newAccess.password,
            name: this.newAccess.name,
          })
          .then((response) => {
            this.dialog = false;
            this.dialogItem = {};
            this.newAccess = {};
            this.$refs.form.resetValidation();
            this.getAccesses();
          });
      }
    },
    closeDialog() {
      this.dialogItem = {};
      this.newAccess = {};
      this.dialog = false;
      this.$refs.form.resetValidation();
    },
  },
};
</script>
