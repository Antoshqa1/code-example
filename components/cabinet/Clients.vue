<template>
  <div>
    <div class="p-4 pb-0">
      <v-card
        color="indigo darken-2 p-3 d-flex align-center"
        rounded
        max-width="180px"
        class="elevation-5"
      >
        <v-avatar size="25">
          <v-icon size="25" dark> mdi-account-multiple </v-icon>
        </v-avatar>
        <div class="d-flex flex-column pl-2">
          <v-card-title class="white--text p-0 number">
            {{ allClients.length }}
          </v-card-title>
          <v-card-text class="white--text p-0">Всего клиентов</v-card-text>
        </div>
      </v-card>
    </div>
    <div class="p-4">
      <v-data-table
        :headers="headers"
        :items="allClients"
        :items-per-page="5"
        class="elevation-5 clients-table"
        :loading="loadingTable"
        loading-text="Загрузка"
        :footer-props="{
          'items-per-page-text': 'Элементов на странице',
        }"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <!-- <v-toolbar-title>My CRUD</v-toolbar-title> -->
            <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  width="250px"
                  class="elevation-5 indigo accent-2 mt-2 white--text"
                  v-bind="attrs"
                  v-on="on"
                >
                  Добавить клиента
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Имя"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.vk_id"
                          label="id Вконтакте"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.ym_id"
                          label="id Метрики"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDialog">
                    Отменить
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveClient">
                    Сохранить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Вы уверены что хотите удалить этого клиента??</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Отменить</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Удалить</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ClientDialog from "../dialogs/ClientDIalog";

export default {
  components: { ClientDialog },
  data() {
    return {
      allClients: [],
      headers: [
        {
          text: "Имя",
          align: "start",
          sortable: false,
          value: "name",
          class: "title",
        },
        {
          text: "ID",
          value: "id",
          sortable: false,
        },
        {
          text: "id Вконтакте",
          value: "vk_id",
          sortable: false,
        },
        {
          text: "id Метрики",
          value: "ym_id",
          sortable: false,
        },
        { text: "Действия", value: "actions", sortable: false },
      ],
      loadingTable: true,
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: "name",
        vk_id: 0,
        ym_id: 0,
      },
      emptyItem: {
        name: "name",
        vk_id: 0,
        ym_id: 0,
      },
    };
  },
  mounted() {
    this.getAllCabinetClients();
  },
  methods: {
    getAllCabinetClients() {
      axios
        .post("/api/clients/getAllCabinetClients", {
          cabinetId: this.currentCabinet,
        })
        .then((res) => {
          this.allClients = res.data;
          this.loadingTable = false;
        })
        .catch((er) => {
          console.log(er);
        });
    },
    editItem(item) {
      this.editedIndex = item.id;
      this.editedItem = item;
      this.dialog = true;
      console.log(item);
      console.log("нажали на именение клиента");
    },
    closeDialog() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.emptyItem);
      });
      console.log("нажали на отмену измнения клиента");
    },
    saveClient() {
      if (this.editedIndex == -1) {
        axios
          .post("/api/clients/store", {
            clientName: this.editedItem.name,
            cabinetId: this.currentCabinet,
            vk: this.editedItem.vk_id,
            yandexMetrica: this.editedItem.ym_id,
          })
          .then((response) => {
            this.allClients = [];
            this.closeDialog();
            this.getAllCabinetClients();
          })
          .catch((er) => {
            console.log(er);
          });
      } else {
        axios
          .post("/api/clients/update", {
            client: this.editedItem,
            cabinetId: this.currentCabinet,
          })
          .then((res) => {
            this.allClients = [];
            this.closeDialog();
            this.getAllCabinetClients();
          })
          .catch((er) => {
            console.log(er);
          });
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.editedIndex = -1;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .post("/api/clients/destroy", {
          clientId: this.editedIndex,
        })
        .then((res) => {
          this.allClients = [];
          this.getAllCabinetClients();
          this.dialogDelete = false;
        })
        .catch((er) => {
          console.log(er);
        });
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      allCabinets: "auth/allCabinets",
      user: "auth/user",
      currentCabinet: "auth/currentCabinet",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Добавить клиента" : "Измнить данные клиента";
    },
  },
  watch: {
    editedIndex() {
      if (this.editedIndex == -1) {
        this.editedItem = Object.assign({}, this.emptyItem);
      }
    },
    dialog() {
      if (this.dialog == false) {
        this.editedIndex = -1;
        this.editedItem = Object.assign({}, this.emptyItem);
      }
    },
    dialogDelete() {
      if (this.dialogDelete == false) {
        this.editedIndex = -1;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.kek {
  width: 200px;
  height: 200px;
}
.number {
  line-height: 1;
}
.clients-table {
  thead {
    th {
      background-color: red;
    }
  }
}
</style>
