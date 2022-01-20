<template>
  <div>
    <v-btn @click="test">mttest</v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    test() {
      axios
        .post("/api/access/test", {
          token:
            "x61FJi0LgfNDMOq4C1my785z9CtDdqiRIWbgxxzjg9hiupXOpaUQx4IQ564HLqoaa8N4UAdZq0CFbYTeutuAFJ21tD1tZK2tMRieUoJj7ESFH9aeU0YlhXH1C86AIcPBG7qUFQmS8lV9gtoBuy6t61w2lOrzodGgMO7daeE4nOmxuEQE4ab1GTZ71OF4JY6u6ij311fI5Y0d9ORAZMxp49Zjxoy6xbZcsI2kurjE5m2",
        })
        .then((res) => {
          console.log(res.data);
        });
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      allCabinets: "auth/allCabinets",
      user: "auth/user",
      currentCabinet: "auth/currentCabinet",
      mttoken: "tokens/mttoken",
    }),
  },
};
</script>

<style scoped></style>
