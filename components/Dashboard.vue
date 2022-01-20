<template>
  <div class="container">
    <v-btn @click="test"> mytarget </v-btn>
    <v-btn @click="test2"> mytarget--тест </v-btn>
    <v-btn @click="yd">yandex direct test</v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    test() {
      axios.post("/api/test").then((res) => {
        console.log(res);
      });
    },
    test2() {
      axios.post("/api/test2").then((res) => {
        console.log(res.data);
      });
    },
    yd() {
      axios.post("/api/yd").then((res) => {
        console.log(res);
      });
    },
  },
  mounted() {},
  computed: {},
};
</script>
