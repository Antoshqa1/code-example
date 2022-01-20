<template>
  <div class="container">
    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th>{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role_id }}</td>
            <td class="justify-center pt-3 pb-3 text-center">
              <v-btn
                elevation="4"
                icon
                class="light-blue darken-2 white--text"
                @click="editPost(user)"
              >
                <i class="fas fa-pen"></i>
              </v-btn>
            </td>
            <td class="justify-center pt-3 pb-3 text-center">
              <v-btn elevation="4" icon color="danger" class="red white--text">
                <i class="fas fa-trash-alt"></i>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Профиль пользователя: {{ modalData.name }} </span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field :label="modalData.name" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select :items="['1', '2', '3']" label="Роль">{{
                    modalData.role
                  }}</v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" rounded text @click="dialog = false">
              Закрыть
            </v-btn>
            <v-btn color="blue darken-1" rounded text @click="dialog = false">
              Сохранить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      users: null,
      dialog: false,
      modalData: {
        name: "",
        role: 2,
      },
    };
  },
  mounted() {
    axios
      .get("/api/allUsers")
      .then((response) => {
        this.users = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    editPost(user) {
      this.dialog = !this.dialog;
      this.modalData.name = user.name;
      this.modalData.role = user.role_id;
    },
  },
};
</script>
