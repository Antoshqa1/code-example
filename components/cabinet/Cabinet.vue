<template>
  <div class="p-4">
    <div
      class="p-4 elevation-5 dates indigo darken-2 white--text d-flex align-center justify-start"
    >
      <v-avatar size="25" class="mr-2">
        <v-icon size="25" dark> mdi-calendar-month </v-icon>
      </v-avatar>
      <v-menu open-on-hover :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }" class="white--text">
          <v-text-field
            v-model="allDateInput"
            label="Выбранный период"
            v-bind="attrs"
            v-on="on"
            readonly
            hide-details
            dark
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="allDate"
          locale="ru-RU"
          :max="maxDate"
          range
          :title-date-format="titleDate"
          no-title
        ></v-date-picker>
      </v-menu>
    </div>
    <div class="elevation-5">
      <MainTable :startDate="startDate" :endDate="endDate" />
    </div>
    <div class="elevation-5 chart">
      <!-- <SpentChart :allDate="allDate" /> -->
    </div>
  </div>
</template>

<script>
import MainTable from "./Table";
import SpentChart from "./charts/SpentChart";
import { mapGetters } from "vuex";

export default {
  components: { MainTable, SpentChart },
  data() {
    return {
      startDate: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 2)
        .toISOString()
        .substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      maxDate: new Date().toISOString().substr(0, 10),
      allDate: [
        new Date(new Date().getFullYear(), new Date().getMonth() - 1, 2)
          .toISOString()
          .substr(0, 10),
        new Date().toISOString().substr(0, 10),
      ],
    };
  },
  computed: {
    allDateInput() {
      return this.allDate.join(" ~ ");
    },
    ...mapGetters({
      authenticated: "auth/authenticated",
      allCabinets: "auth/allCabinets",
      user: "auth/user",
      currentCabinet: "auth/currentCabinet",
    }),
  },
  methods: {
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
  },
  watch: {
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
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$store.getters["auth/authenticated"]) {
        vm.$router.push({ path: "/login" });
      }
    });
  },
};
</script>

<style scoped lang="scss">
.dates {
  max-width: 265px;
}
.chart {
  max-width: 50%;
}
</style>
