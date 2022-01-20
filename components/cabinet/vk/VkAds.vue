<template>
  <div>
    <div>
      <div class="d-flex align-center justify-between main__table__row">
        <div class="main__table__item main__table__item-main">{{ ads.name }}</div>
        <div class="main__table__item">{{ ads.allSpent.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.allClicks.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.allImpressions.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.CTR.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.CPC.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.ym_stat_totals[0] }}</div>
        <div class="main__table__item">{{ ads.ym_stat_totals[1] }}</div>
        <div class="main__table__item">{{ ads.ym_stat_totals[2] }}</div>
        <div class="main__table__item">{{ ads.ym_stat_totals[3] }}</div>
        <div class="main__table__item">{{ ads.ym_stat_totals[4] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["ads", "VkToken"],
};
</script>

<style scoped lang="scss">
.main__table__item-main {
  width: 290px;
  left: 60px;
  margin-left: 60px;
  &:hover {
    cursor: default;
  }
  &:before {
    content: "";
    position: absolute;
    top: -1px;
    left: -61px;
    height: calc(100% + 2px);
    width: 60px;
    background: #f1f2f3;
  }
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
