<template>
  <div>
    <div>
      <div class="d-flex align-center justify-between main__table__row">
        <div @click.self="showPlatforms" class="main__table__item main__table__item-main">
          <i class="fas fa-chevron-down"></i> {{ client.name }}
        </div>
        <div class="main__table__item">
          {{ client.totals.spent.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.clicks.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.shows.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.ctr.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.cpc.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.visits.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.visitors.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.refusals.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.page_depth.toLocaleString("ru") }}
        </div>
        <div class="main__table__item">
          {{ client.totals.time.toLocaleString("ru") }}
        </div>
      </div>
      <transition name="fade">
        <div v-if="isShow" class="block">
          <div class="block__header_small">Платформы</div>
          <template v-if="client.platforms.includes(5)">
            <VkPlatform
              :startDate="startDate"
              :endDate="endDate"
              :client="client"
              :VkToken="VkToken"
              :YmToken="YmToken"
            ></VkPlatform>
          </template>
          <template v-if="client.platforms.includes(6)">
            <MtPlatform
              :startDate="startDate"
              :endDate="endDate"
              :client="client"
              :VkToken="VkToken"
              :YmToken="YmToken"
              :MtToken="MtToken"
            ></MtPlatform>
          </template>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import VkPlatform from "./vk/VkPlatform";
import MtPlatform from "./mytarget/MtPlatform";
export default {
  components: {
    VkPlatform,
    MtPlatform,
  },
  props: ["client", "startDate", "endDate", "VkToken", "YmToken", "MtToken"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    showPlatforms() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped lang="scss">
.block {
  padding-bottom: 10px;
}
.main__table__row {
  &:hover {
    background-color: #e9e9e9;
    .main__table__item {
      background-color: #e9e9e9;
    }
  }
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
</style>
