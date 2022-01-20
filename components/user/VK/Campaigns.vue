<template>
  <div>
    <div @click.once="getAds" class="ads__block">
      <div class="d-flex align-center justify-between main__table__row">
        <div @click.self="showAds" class="main__table__item main__table__item-main">
          {{ campaign.name }}
        </div>
        <div class="main__table__item">
          {{ campaign.allSpent.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ campaign.allClicks.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ campaign.allImpressions.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ campaign.ctr.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ campaign.cpc.toLocaleString("ru") }}
        </div>
      </div>
      <div v-if="isShow" class="rows__block">
        <div class="block__header_small">Объявления</div>
        <div v-for="item in adsAll" :key="item.id">
          <Ads :ads="item" :startDate="startDate"></Ads>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ads from "./Ads";
export default {
  data() {
    return {
      isShow: false,
      accessToken: "",
      ads: [],
      ads_ids: [],
      adsStat: [],
      adsAll: [],
    };
  },
  components: { Ads },
  props: ["client", "startDate", "endDate", "campaign"],
  methods: {
    showAds() {
      this.isShow = !this.isShow;
    },
    // getAds() {
    //   this.accessToken = document.location.hash.split("=")[1].split("&")[0];
    //   axios
    //     .post("/api/getAds", {
    //       client_id: this.client.id,
    //       token: this.accessToken,
    //       campaign_id: this.campaign.id,
    //     })
    //     .then((response) => {
    //       this.ads = response.data;
    //       this.ads.forEach((el) => {
    //         this.ads_ids.push(el.id);
    //       });
    //       console.log(this.ads_ids);
    //       console.log(this.ads);
    //     });
    // },
    getAds() {
      this.accessToken = document.location.hash.split("=")[1].split("&")[0];
      axios
        .post("/api/getAds", {
          client_id: this.client.id,
          token: this.accessToken,
          campaign_id: this.campaign.id,
        })
        .then((response) => {
          this.ads = response.data;
          this.ads.forEach((el) => {
            this.ads_ids.push(el.id);
          });
        })
        .then(() => {
          axios
            .post("/api/getStatistics", {
              token: this.accessToken,
              startDate: this.startDate,
              endDate: this.endDate,
              ids_type: "ad",
              ids: this.ads_ids,
              period: "day",
            })
            .then((response) => {
              this.adsStat = response.data;
            })
            .then(() => {
              this.ads.forEach((el) => {
                this.adsStat.forEach((element) => {
                  if (el.id == element.id) {
                    el.stats = element.stats;
                  }
                });
              });
            })
            .then(() => {
              this.ads.forEach((el) => {
                el.allSpent = 0;
                el.allClicks = 0;
                el.allImpressions = 0;
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
              this.adsAll = this.ads;
              console.log(this.adsAll);
            });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.main__table__item-main {
  width: 330px;
  left: 20px;
  margin-left: 20px;
  &::hover {
    cursor: pointer;
  }
  &:before {
    content: "";
    position: absolute;
    top: -1px;
    left: -21px;
    height: calc(100% + 2px);
    width: 20px;
    background: #f1f2f3;
  }
}
.block__header_small {
  padding-left: 40px;
}
</style>
