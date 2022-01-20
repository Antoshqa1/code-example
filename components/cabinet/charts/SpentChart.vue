<template>
  <div class="mt-4 p-4">
    <VueApexCharts
      width="100%"
      type="line"
      :options="options"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapGetters } from "vuex";
export default {
  components: { VueApexCharts },
  props: ["allDate"],
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: "series-2",
          data: [20, 30, 15, 30, 19, 70, 90, 41],
        },
      ],
      days: [],
    };
  },
  computed: {
    ...mapGetters({
      clients: "clients/clients",
    }),
  },
  watch: {
    "$store.state.clients.clients": function () {
      console.log(this.clients);
      this.allClients = this.clients;

      console.log(this.allClients[0]);
      //   console.log(this.days);
      this.chart.updateSeries([
        {
          name: "series-1",
          data: [10, 10, 15, 10, 19, 10, 10, 11],
        },
      ]);
    },
  },
};
</script>

<style></style>
