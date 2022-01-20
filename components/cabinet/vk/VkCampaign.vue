<template>
  <div>
    <div class="ads__block">
      <div class="d-flex align-center justify-between main__table__row">
        <div
          @click.self="showAds"
          @click.once="getAdsStatisticsVkAndYm"
          class="main__table__item main__table__item-main"
        >
          <i class="fas fa-chevron-down"></i> {{ campaign.id }}
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
          {{ campaign.CTR.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ campaign.CPC.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ campaign.ym_stat_totals[0] }}
        </div>
        <div class="main__table__item">
          {{ campaign.ym_stat_totals[1] }}
        </div>
        <div class="main__table__item">
          {{ campaign.ym_stat_totals[2] }}
        </div>
        <div class="main__table__item">
          {{ campaign.ym_stat_totals[3] }}
        </div>
        <div class="main__table__item">
          {{ campaign.ym_stat_totals[4] }}
        </div>
      </div>
      <transition name="fade">
        <div v-if="isShow" class="rows__block">
          <div class="block__header_small">Объявления</div>
          <div v-for="item in adsAll" :key="item.id">
            <VkAds
              :ads="item"
              :startDate="startDate"
              :endDate="endDate"
              :VkToken="VkToken"
            ></VkAds>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VkAds from "./VkAds";
export default {
  components: {
    VkAds,
  },
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
  props: ["client", "campaign", "startDate", "endDate", "VkToken", "YmToken"],
  methods: {
    showAds() {
      this.isShow = !this.isShow;
    },
    getAdsStatisticsVkAndYm() {
      axios
        .post("/api/VK/getAdsStatisticsVkAndYm", {
          VkToken: this.VkToken,
          YmToken: this.YmToken,
          vkClientId: this.client.accountVk,
          ymClientId: this.client.accountYm,
          startDate: this.startDate,
          endDate: this.endDate,
          campaignId: this.campaign.id,
        })
        .then((res) => {
          this.adsAll = res.data;
          console.log(res);
        });
    },
  },
  mounted() {
    // this.getAdsStatisticsVkAndYm();
  },
};
</script>

<style scoped lang="scss">
.main__table__item-main {
  width: 310px;
  left: 40px;
  margin-left: 40px;
  &:before {
    content: "";
    position: absolute;
    top: -1px;
    left: -41px;
    height: calc(100% + 2px);
    width: 40px;
    background: #f1f2f3;
  }
}
.block__header_small {
  padding-left: 60px;
}
.fa-chevron-down {
  margin-right: 5px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.main__table__row {
  &:hover {
    background-color: #e9e9e9;
    .main__table__item {
      background-color: #e9e9e9;
    }
  }
}
</style>
