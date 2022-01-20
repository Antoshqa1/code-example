<template>
  <div>
    <div>
      <div class="d-flex align-center justify-between main__table__row">
        <div class="main__table__item main__table__item-main" @click.self="showCampaigns">
          <i class="fas fa-chevron-down"></i> mytarget
        </div>
        <div class="main__table__item">
          {{ client.mt_stat.total.base.spent.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.mt_stat.total.base.clicks.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.mt_stat.total.base.shows.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.mt_stat.total.base.ctr.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.mt_stat.total.base.cpc.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.ym_mt_stats_totals[0] }}
        </div>
        <div class="main__table__item">
          {{ client.ym_mt_stats_totals[1] }}
        </div>
        <div class="main__table__item">
          {{ client.ym_mt_stats_totals[2] }}
        </div>
        <div class="main__table__item">
          {{ client.ym_mt_stats_totals[3] }}
        </div>
        <div class="main__table__item">
          {{ client.ym_mt_stats_totals[4] }}
        </div>
      </div>
      <transition name="fade">
        <div v-if="isShow" class="rows__block">
          <div class="block__header_small">Кампании</div>
          <div v-for="item in campaignAll" :key="item.id">
            <transition name="fade">
              <MtCampaign
                :client="client"
                :campaign="item"
                :startDate="startDate"
                :endDate="endDate"
                :YmToken="YmToken"
                :MtToken="MtToken"
              ></MtCampaign>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import MtCampaign from "./MtCampaign";
export default {
  props: ["client", "startDate", "endDate", "VkToken", "YmToken", "MtToken"],
  components: {
    MtCampaign,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showCampaigns() {
      this.isShow = !this.isShow;
      this.getCampaignsStatisticsMtAndYm();
    },
    getCampaignsStatisticsMtAndYm() {
      axios
        .post("/api/VK/getCampaignsStatisticsMtAndYm", {
          YmToken: this.YmToken,
          MtToken: this.MtToken,
          ymClientId: this.client.accountYm,
          mtClientId: this.client.accountMt,
          startDate: this.startDate,
          endDate: this.endDate,
        })
        .then((res) => {
          this.campaignAll = res.data;
          console.log(res);
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
