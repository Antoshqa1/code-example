<template>
  <div class="d-flex align-center justify-between main__table__header">
    <div
      class="main__table__header_item main__table__item main__table__item-main main__table__item-header"
    >
      Наименование
    </div>
    <div
      v-for="item in headerItems"
      :key="item.id"
      class="main__table__header_item main__table__item main__table__item-header"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerItems: [
        "Затраты",
        "Клики",
        "Показы",
        "CTR",
        "CPC",
        "Визиты",
        "Посетители",
        "Отказы",
        "Глубина просмотра",
        "Время на сайте",
      ],
    };
  },
};
</script>

<style></style>
