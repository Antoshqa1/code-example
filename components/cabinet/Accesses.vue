<template>
  <div>
    <v-card max-width="600" class="mx-auto mt-2 rounded-lg" v-if="!loading">
      <v-list two-line>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="title">{{ item.title }}</v-list-item-title>
            </v-list-item-content>

            <v-btn v-if="!item.logged" @click="auth(item.place)">Дать доступ</v-btn>
            <v-icon v-else color="green darken-2"
              >mdi-checkbox-marked-circle-outline</v-icon
            >
          </v-list-item>
        </template>
      </v-list>
    </v-card>
    <div v-else>Загрузка</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { header: "Ваши доступы" },
        {
          avatar: "https://cdn.worldvectorlogo.com/logos/yandex-logo-en.svg",
          title: "Yandex metrika",
          logged: false,
          place: "ym",
        },
        { divider: true, inset: false },
        {
          avatar: "https://gregory-gost.ru/wp-content/uploads/2019/06/vk-logo.png",
          title: "VK",
          logged: false,
          place: "vk",
        },
        { divider: true, inset: false },
        {
          avatar: "https://www.likeni.ru/upload/iblock/e18/mytarget.jpg",
          title: "MyTarget",
          logged: false,
          place: "mt",
        },
      ],
      loading: true,
      randomCode: this.makeRandomCode(),
    };
  },
  methods: {
    auth(place) {
      if (place == "vk") {
        window.location.href =
          "https://oauth.vk.com/authorize?client_id=7710766&redirect_uri=http://127.0.0.1:8000/tokens/vk&display=page&scope=ads,offline&response_type=token";
      } else if (place == "ym") {
        window.location.href =
          "https://oauth.yandex.ru/authorize?response_type=token&client_id=8bc0eb4ecde7478d8cc32be90a956f83&redirect_uri=http://127.0.0.1:8000/tokens/ym";
      } else if (place == "mt") {
        window.location.href =
          "https://target-sandbox.my.com/oauth2/authorize?scope=read_ads,read_payments,create_ads,create_clients,read_clients,create_agency_payments,read_manager_clients,edit_manager_clients,read_payments&response_type=code&client_id=jt9E4mWPcbr4V2uJ&state=" +
          this.randomCode;
      }
      axios
        .post("/api/access/auth", {
          place: place,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((er) => {
          console.log(er);
        });
    },
    makeRandomCode() {
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
  },
  mounted() {
    axios
      .post("/api/access/check", {
        cabinet_id: this.currentCabinet,
      })
      .then((response) => {
        console.log(response.data);
        this.items.forEach((item) => {
          if (item.place) {
            if (item.place == "vk") {
              if (response.data.vk_token === null || response.data.vk_token == "") {
                item.logged = false;
                console.log("kek");
              } else {
                item.logged = true;
              }
            } else if (item.place == "ym") {
              if (response.data.ym_token === null || response.data.ym_token == "") {
                item.logged = false;
              } else {
                item.logged = true;
              }
            } else if (item.place == "mt") {
              if (response.data.mt_token === null || response.data.mt_token == "") {
                item.logged = false;
              } else {
                item.logged = true;
              }
            }
          }
        });
      })
      .then(() => {
        this.loading = false;
      })
      .catch((er) => {
        console.log(er);
      });
  },
  computed: {
    currentCabinet() {
      return this.$store.state.auth.currentCabinet;
    },
  },
};
</script>

<style></style>
