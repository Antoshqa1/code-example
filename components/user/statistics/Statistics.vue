<template>
  <div class="container">
    <v-btn @click="getClients">Клиенты</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: [],
    };
  },
  methods: {
    getClients() {
      axios.get("/api/allClients").then((response) => {
        this.clients = response.data;
        console.log(this.clients);
      });
    },
  },
};
</script>

<style></style>
