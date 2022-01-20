<template>
  <div fluid class="mt-2">
    <v-btn @click="authVk">VK</v-btn>
    <div fluid class="mt-4 p-3">
      <v-row class="flex justify-center align-center">
        <v-col class="col-3">
          <v-menu
            v-model="startDateMenu"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="startDate"
                label="Дата начала"
                v-on="on"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              @input="startDateMenu = false"
              locale="ru-RU"
              :max="maxDate"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="col-3">
          <v-menu
            v-model="endDateMenu"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="endDate"
                label="Дата окончания"
                v-on="on"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              @input="startDateMenu = false"
              locale="ru-RU"
              :max="maxDate"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col class="col-3">
          <v-select
            v-model="selectedPeriod"
            :items="periods"
            label="Период"
            item-text="name"
            item-value="value"
          ></v-select>
        </v-col>
        <v-col class="col-3">
          <v-btn
            rounded
            @click.prevent="
              getStatistics(
                selectedClients,
                selectedPeriod,
                selectedTypes,
                startDate,
                endDate
              )
            "
            >Получить</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <div class="mt-4 main__table w-100">
      <div class="d-flex align-center justify-between main__table__header">
        <div
          class="main__table__header_item main__table__item main__table__item-main main__table__item-header"
        >
          Наименование
        </div>
        <div class="main__table__header_item main__table__item main__table__item-header">
          Затраты
        </div>
        <div class="main__table__header_item main__table__item main__table__item-header">
          Клики
        </div>
        <div class="main__table__header_item main__table__item main__table__item-header">
          Показы
        </div>
        <div class="main__table__header_item main__table__item main__table__item-header">
          CTR
        </div>
        <div class="main__table__header_item main__table__item main__table__item-header">
          CPC
        </div>
      </div>
      <div v-for="item in clientsAll" :key="item.id">
        <Clients :client="item" :startDate="startDate" :endDate="endDate" ref="clients" />
      </div>
    </div>
  </div>
</template>

<script>
import Campaigns from "./Campaigns.vue";
import Clients from "./Clients.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    Campaigns,
    Clients,
  },
  data() {
    return {
      urlGet: "",
      accessToken: "",
      selectedClients: [],
      clients: [],
      clientsAll: [],
      clientsName: [],
      clients_ids: [],
      neededItems: [],
      periods: [
        {
          name: "День",
          value: "day",
        },
        {
          name: "Месяц",
          value: "month",
        },
        {
          name: "Неделя",
          value: "week",
        },
        {
          name: "Все время",
          value: "overall",
        },
      ],
      selectedPeriod: "",
      startDateMenu: "",
      endDateMenu: "",
      // startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 2)
      // .toISOString()
      // .substr(0, 10),
      startDate: "2021-01-01",
      endDate: new Date().toISOString().substr(0, 10),
      maxDate: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    getClients() {
      // this.accessToken = document.location.hash.split("=")[1].split("&")[0];
      this.accessToken = localStorage.getItem("vkToken");
      axios
        .post("/api/getClients", {
          token: this.accessToken,
        })
        .then((response) => {
          this.clients = response.data;
          this.clients.forEach((el) => {
            this.clientsName.push(el.name);
            this.clients_ids.push(el.id);
          });
        })
        .then(() => {
          axios
            .post("/api/getStatistics", {
              token: this.accessToken,
              startDate: this.startDate,
              endDate: this.endDate,
              ids_type: "client",
              ids: this.clients_ids,
              period: "day",
            })
            .then((response) => {
              this.clientsStat = response.data;
            })
            .then(() => {
              this.clients.forEach((el) => {
                this.clientsStat.forEach((element) => {
                  if (el.id == element.id) {
                    el.stats = element.stats;
                  }
                });
              });
            })
            .then(() => {
              this.clients.forEach((el) => {
                el.allSpent = 0;
                el.allClicks = 0;
                el.allImpressions = 0;
                el.cpc = 0;
                el.ctr = 0;
                el.stats.forEach((element) => {
                  if (!!element.spent) {
                    element.spent = +element.spent;
                    el.allSpent = el.allSpent + element.spent;
                    el.allSpent = +el.allSpent;
                    el.allSpent = 1 * el.allSpent.toFixed(2);
                  }
                  if (!!element.clicks) {
                    el.allClicks = el.allClicks + element.clicks;
                  }
                  if (!!element.impressions) {
                    element.impressions = +element.impressions;
                    el.allImpressions = el.allImpressions + element.impressions;
                    el.allImpressions = +el.allImpressions;
                    el.allImpressions = 1 * el.allImpressions.toFixed(2);
                  }
                });
                if (
                  el.allClicks != 0 &&
                  el.allClicks > 0 &&
                  el.allImpressions != 0 &&
                  el.allImpressions > 0 &&
                  !!el.allImpressions &&
                  !!el.allClicks
                ) {
                  el.ctr = (el.allClicks / el.allImpressions) * 100;
                  el.ctr = 1 * el.ctr.toFixed(3);
                } else {
                  el.ctr = 0;
                }
                el.cpc = 0;
                if (
                  el.allSpent != 0 &&
                  el.allSpent > 0 &&
                  el.allClicks != 0 &&
                  el.allClicks > 0 &&
                  !!el.allSpent &&
                  !!el.allClicks
                ) {
                  el.cpc = el.allSpent / el.allClicks;
                  el.cpc = 1 * el.cpc.toFixed(2);
                } else {
                  el.cpc = 0;
                }
              });
              this.clientsAll = this.clients;
              console.log(this.clientsAll);
            });
        });
    },
    refreshClients() {
      axios
        .post("/api/getStatistics", {
          token: this.accessToken,
          startDate: this.startDate,
          endDate: this.endDate,
          ids_type: "client",
          ids: this.clients_ids,
          period: "day",
        })
        .then((response) => {
          this.clientsStat = response.data;
        })
        .then(() => {
          this.clients.forEach((el) => {
            this.clientsStat.forEach((element) => {
              if (el.id == element.id) {
                el.stats = element.stats;
              }
            });
          });
        })
        .then(() => {
          this.clients.forEach((el) => {
            el.allSpent = 0;
            el.allClicks = 0;
            el.allImpressions = 0;
            el.cpc = 0;
            el.ctr = 0;
            el.stats.forEach((element) => {
              if (!!element.spent) {
                element.spent = +element.spent;
                el.allSpent = el.allSpent + element.spent;
                el.allSpent = +el.allSpent;
                el.allSpent = 1 * el.allSpent.toFixed(2);
              }
              if (!!element.clicks) {
                el.allClicks = el.allClicks + element.clicks;
              }
              if (!!element.impressions) {
                element.impressions = +element.impressions;
                el.allImpressions = el.allImpressions + element.impressions;
                el.allImpressions = +el.allImpressions;
                el.allImpressions = 1 * el.allImpressions.toFixed(2);
              }
            });
            if (
              el.allClicks != 0 &&
              el.allClicks > 0 &&
              el.allImpressions != 0 &&
              el.allImpressions > 0 &&
              !!el.allImpressions &&
              !!el.allClicks
            ) {
              el.ctr = (el.allClicks / el.allImpressions) * 100;
              el.ctr = 1 * el.ctr.toFixed(3);
            } else {
              el.ctr = 0;
            }
            el.cpc = 0;
            if (
              el.allSpent != 0 &&
              el.allSpent > 0 &&
              el.allClicks != 0 &&
              el.allClicks > 0 &&
              !!el.allSpent &&
              !!el.allClicks
            ) {
              el.cpc = el.allSpent / el.allClicks;
              el.cpc = 1 * el.cpc.toFixed(2);
            } else {
              el.cpc = 0;
            }
          });
          this.clientsAll = this.clients;
          // console.log(this.clientsAll);
        });
    },
    authVk() {
      window.location.href =
        "https://oauth.vk.com/authorize?client_id=7710766&display=page&redirect_uri=http://127.0.0.1:8000/user/vk&scope=friends&response_type=token&v=5.126&state=123456&scope=ads,offline";
    },
    ...mapMutations(["SET_VKTOKEN"]),
  },
  mounted() {
    this.getClients();
    if (document.location.hash) {
      this.accessToken = document.location.hash.split("=")[1].split("&")[0];
      localStorage.removeItem("vkToken");
      localStorage.setItem("vkToken", this.accessToken);
      this.$store.commit("tokens/SET_VKTOKEN", this.accessToken);
    }
  },
  watch: {
    startDate() {
      this.refreshClients();
      this.$refs.clients.getCampaigns();
    },
    endDate() {
      this.getClients();
    },
  },
};
</script>
<style lang="scss">
.main__table {
  font-size: 12px;
  overflow-x: scroll;
  background: #f1f2f3;
  &__header {
    height: 45px;
  }
  &__row {
    width: 100%;
  }
  &__item {
    height: 25px;
    width: 90px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-shrink: 0;
    background-color: #fff;
    border: solid 1px #f1f2f3;
    padding: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    text-align: right;
  }
  &__item-main {
    width: 350px;
    position: sticky;
    left: 0;
    justify-content: flex-start;
    text-align: left;
    padding-left: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  &__item-header {
    height: 100%;
    font-weight: 700;
    font-size: 12px;
    line-height: 1.1;
    &:hover {
      cursor: default;
    }
  }
}
.rows__block {
  padding-top: 10px;
  padding-bottom: 10px;
}
.block__header_small {
  height: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 11px;
  color: #878f93;
  padding-left: 20px;
  padding-bottom: 5px;
}
</style>
