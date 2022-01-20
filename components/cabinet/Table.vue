<template>
  <div>
    <div class="mt-4 main__table w-100" v-if="!loading">
      <TableHeader />
      <div v-for="item in cabinetClientsStat" :key="item.id">
        <Client
          :startDate="startDate"
          :endDate="endDate"
          :client="item"
          :VkToken="VkToken"
          :YmToken="YmToken"
          :MtToken="MtToken"
        />
      </div>
    </div>
    <div v-if="loading">Идет загрузка</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Client from "./Client.vue";
import TableHeader from "./TableHeader.vue";
export default {
  components: { Client, TableHeader },
  props: ["startDate", "endDate"],
  data() {
    return {
      cabinets: null,
      VkToken: null,
      YmToken: null,
      MtToken: null,
      cabinetClientsStat: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      allCabinets: "auth/allCabinets",
      user: "auth/user",
      currentCabinet: "auth/currentCabinet",
    }),
    cabinet() {
      return this.$store.state.auth.currentCabinet;
    },
    allDateInput() {
      return this.allDate.join(" ~ ");
    },
  },
  mounted() {
    this.doAllStaff();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_CABINET", "SET_CLIENTS"]),
    getAllCabinets() {
      axios
        .post("/api/getAllCabinets", {
          cabinets: this.allCabinets,
        })
        .then((response) => {
          this.cabinets = response.data;
        });
    },
    changeCurrentCabinet(id) {
      this.$store.commit("auth/SET_CURRENT_CABINET", id);
    },
    titleDate(dates) {
      return dates
        .map((n) =>
          new Date(n).toLocaleString("ru-RU", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        )
        .join(" - ");
    },
    async getVkToken() {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/token", {
            params: {
              cabinet_id: this.cabinet,
              platform_id: 5,
            },
          })
          .then((res) => {
            this.VkToken = res.data[0].token;
            resolve(res.data[0].token);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async getYmToken() {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/token", {
            params: {
              cabinet_id: this.cabinet,
              platform_id: 1,
            },
          })
          .then((res) => {
            this.YmToken = res.data[0].token;
            resolve(res.data[0].token);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    async getMtToken() {
      return new Promise((resolve, reject) => {
        axios
          .get("/api/token", {
            params: {
              cabinet_id: this.cabinet,
              platform_id: 6,
            },
          })
          .then((res) => {
            this.MtToken = res.data[0].token;
            resolve(res.data[0].token);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    updateDataIfParamChanged() {
      this.cabinetClientsStat = null;
      this.getCabinetClientsStatistics();
    },
    async doAllStaff() {
      try {
        await this.getAllCabinets();
        await this.getVkToken().then((token) => {
          console.log(token);
        });
        await this.getYmToken().then((token) => {
          console.log(token);
        });
        await this.getMtToken().then((token) => {
          console.log(token);
        });
        await this.getCabinetClientsStatistics();
      } catch (err) {
        console.log(err);
      }
    },
    getCabinetClientsStatistics() {
      return new Promise((resolve, reject) => {
        axios
          .post("/api/VK/getCabinetClientsStatistics", {
            cabinet_id: this.cabinet,
            tokenVK: this.VkToken,
            tokenYM: this.YmToken,
            tokenMT: this.MtToken,
            endDate: this.endDate,
            startDate: this.startDate,
          })
          .then((res) => {
            console.log(res.data);
            this.cabinetClientsStat = res.data;
            this.$store.commit("clients/SET_CLIENTS", res.data);
            resolve(res.data);
          });
      });
    },
  },
  watch: {
    cabinet() {
      this.updateDataIfParamChanged();
    },
    endDate() {
      this.updateDataIfParamChanged();
    },
    startDate() {
      this.updateDataIfParamChanged();
    },
    allDate() {
      if (this.allDate.length == 2) {
        if (this.allDate[0] >= this.allDate[1]) {
          let bufer = this.allDate[1];
          this.allDate[1] = this.allDate[0];
          this.allDate[0] = bufer;
        }
        this.startDate = this.allDate[0];
        this.endDate = this.allDate[1];
      }
    },
    cabinetClientsStat() {
      if (this.cabinetClientsStat == null) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.main__table {
  font-size: 12px;
  overflow-x: scroll;
  background: #f1f2f3;
  position: relative;
  &__header {
    height: 45px;
    position: sticky;
    top: 0;
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
