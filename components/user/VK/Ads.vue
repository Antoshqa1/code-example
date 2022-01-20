<template>
  <div>
    <div>
      <div class="d-flex align-center justify-between main__table__row">
        <div class="main__table__item main__table__item-main">
          {{ ads.name }}
        </div>
        <div class="main__table__item">{{ ads.allSpent.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.allClicks.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.allImpressions.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.ctr.toLocaleString("ru") }}</div>
        <div class="main__table__item">{{ ads.cpc.toLocaleString("ru") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accessToken: "",
    };
  },
  props: ["ads"],
};
</script>

<style scoped lang="scss">
.main__table__item-main {
  width: 310px;
  left: 40px;
  margin-left: 40px;
  &:hover {
    cursor: default;
  }
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
</style>
