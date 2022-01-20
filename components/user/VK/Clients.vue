<template>
  <div @click.once="getCampaigns">
    <div class="d-flex align-center justify-between main__table__row">
      <div @click.self="showCampaigns" class="main__table__item main__table__item-main">
        <!-- <i class="fas fa-chevron-down" :key="isShow"></i>
        <i class="fas fa-chevron-up"></i> -->
        {{ client.name }}
      </div>
      <div class="main__table__item">
        {{ client.allSpent.toLocaleString("ru") }}
      </div>
      <div class="main__table__item">{{ client.allClicks.toLocaleString("ru") }}</div>
      <div class="main__table__item">
        {{ client.allImpressions.toLocaleString("ru") }}
      </div>
      <div class="main__table__item">{{ client.ctr.toLocaleString("ru") }}</div>
      <div class="main__table__item">{{ client.cpc.toLocaleString("ru") }}</div>
    </div>
    <div v-if="isShow" class="rows__block">
      <div class="block__header_small">Кампании</div>
      <div v-for="item in campaignAll" :key="item.id">
        <Campaigns
          :client="client"
          :campaign="item"
          :startDate="startDate"
          :endDate="endDate"
        ></Campaigns>
      </div>
    </div>
  </div>
</template>

<script>
import Campaigns from "./Campaigns.vue";
export default {
  props: ["client", "startDate", "endDate"],
  components: {
    Campaigns,
  },
  data() {
    return {
      isShow: false,
      accessToken: "",
      campaign: [],
      campaignAll: [],
      campaign_ids: [],
      campaignStat: [],
    };
  },
  methods: {
    showCampaigns() {
      this.isShow = !this.isShow;
    },
    getCampaigns() {
      this.accessToken = document.location.hash.split("=")[1].split("&")[0];
      axios
        .post("/api/getCampaigns", {
          clientId: this.client.id,
          token: this.accessToken,
        })
        .then((response) => {
          this.campaign = response.data;
          // console.log(this.campaign);
          this.campaign_ids = [];
          this.campaign.forEach((el) => {
            this.campaign_ids.push(el.id);
          });
          // console.log(this.campaign_ids);
        })
        .then(() => {
          axios
            .post("/api/getStatistics", {
              token: this.accessToken,
              startDate: this.startDate,
              endDate: this.endDate,
              ids_type: "campaign",
              ids: this.campaign_ids,
              period: "day",
            })
            .catch((e) => {
              // console.log(e);
            })
            .then((response) => {
              console.log(response);
              this.campaignStat = response.data;
            })
            .then(() => {
              this.campaign.forEach((el) => {
                this.campaignStat.forEach((element) => {
                  if (el.id == element.id) {
                    el.stats = element.stats;
                  }
                });
              });
            })
            .then(() => {
              this.campaign.forEach((el) => {
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
                  el.allImpressions > 0
                ) {
                  el.ctr = (el.allClicks / el.allImpressions) * 100;
                  el.ctr = 1 * el.ctr.toFixed(3);
                } else {
                  el.ctr = 0;
                }
                if (
                  el.allSpent != 0 &&
                  el.allSpent > 0 &&
                  el.allClicks != 0 &&
                  el.allSpent > 0
                ) {
                  el.cpc = el.allSpent / el.allClicks;
                  el.cpc = 1 * el.cpc.toFixed(2);
                } else {
                  el.cpc = 0;
                }
              });
              this.campaignAll = this.campaign;
            });
        });
    },
  },
  watch: {
    startDate() {
      if (this.campaignAll.length != 0) {
        // this.getCampaigns();
        // this.test();
      }
    },
    // endDate() {
    //   if (this.campaignAll.length != 0) {
    //     this.getCampaigns();
    //   }
    // },
  },
};
</script>

<style scoped></style>
