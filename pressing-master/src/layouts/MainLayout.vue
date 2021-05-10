<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color: #1a037e" reveal elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="toolbar-title">
          <div>
            Le Pressing
          </div>
        </q-toolbar-title>
        <q-btn
          @click="logUserOut()"
          class="butcol"
          rounded
          glossy
          color="red"
          icon-right="highlight_off"
          label="Déconnecter"
        />
        <router-link to="/Profile">
          <q-icon color="white" size="32px" name="account_circle" />
          <!-- <q-img
            class="absolute-right"
            style="width: 50px"
            src="~assets/l.png"
          /> -->
        </router-link>
        <!--<div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>
    <!-- content-class="bg-dark" -->

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-style="background-color: rgba(17, 24, 39,1)	"
    >
      <!-- src="https://wallpapercave.com/wp/wp3404275.jpg" -->

      <q-list>
        <!-- <q-img
          src="https://image.freepik.com/vecteurs-libre/papier-peint-abstrait-blanc_23-2148808302.jpg"
          style="height: 180px"
        > -->

        <header class="align">
          <q-avatar size="60px" class="q-mb-sm">
            <q-img
              v-if="!this.userdata.imageUrl"
              src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-no-photo-taking-photo-illustration-png-image_4698291.jpg"
            />
            <img :src="this.userdata.imageUrl" />
          </q-avatar>
          <div class="text">{{ this.userdata.nom }}</div>
          <div class="text">{{ this.userdata.prenom }}</div>

          <div class="text">{{ this.userdata.email }}</div>
        </header>
        <q-item to="/home" aria-label="" class="qtem">
          <template v-slot:>
            <div class="row items-center all-pointer-events">
              <q-icon
                style="margin-right:30px"
                class="q-mr-xs"
                size="27px"
                name="home"
              />
              Acceuil
            </div>
          </template>
        </q-item>
        <!-- </q-img> -->
        <!-- <q-item-label header>
          <q-img src="~assets/logopressing.png" />
        </q-item-label> -->
        <q-expansion-item
          v-for="link in essentialLinks"
          :key="link.title"
          group="somegroup"
          :icon="link.icon"
          :label="link.title"
          class="qtem"
        >
          <EssentialLink class="qtem" :links="link.links" />
        </q-expansion-item>
        <q-item to="/profile" aria-label="" class="qtem">
          <template v-slot:>
            <div class="row items-center all-pointer-events">
              <q-icon
                style="margin-right:31px"
                class="q-mr-xs"
                size="27px"
                name="account_circle"
              />
              Profil
            </div>
          </template>
        </q-item>
        <q-separator />
      </q-list>
      <footer>
        <q-img class="alignimg" src="~assets/logopressing.png" />
      </footer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import VueJwtDecode from "vue-jwt-decode";

const linksData = [
  {
    title: "Utilisateurs",
    caption: "",
    icon: "supervised_user_circle",
    links: [
      {
        link: "/client",
        title: "Clients",
        caption: "",
        icon: "person"
      },
      {
        link: "/user",
        title: "Utiliateurs",
        caption: "",
        icon: "school"
      }
    ]
  },
  {
    title: "Parametres",
    caption: "",
    icon: "settings",
    links: [
      {
        link: "/produit",
        title: "Produits",
        caption: "",
        icon: "luggage"
      },
      {
        link: "/categorie",
        title: "Categories",
        caption: "",
        icon: "family_restroom"
      },
      {
        link: "/service",
        title: "Services",
        caption: "",
        icon: "local_laundry_service"
      }
    ]
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      user: [],
      userdata: [],
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  },

  created() {
    this.getUser();
    this.getUserData();
  },
  methods: {
    async getUserData() {
      let res = await this.$axios.get(`/utilisateur/${this.userId}`);
      this.userdata = res.data;
      console.log(this.userdata);
    },
    logUserOut() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    // getUserDetails() {
    //   let token = localStorage.getItem("token");
    //   let user = VueJwtDecode.decode(token);
    //   if (user) {
    //     console.log(user);
    //   } else {
    //     console.log("introuvable");
    //   }
    // },
    async getUser() {
      let token = localStorage.getItem("token");
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      console.log(this.user);
      this.userId = this.user._id;
      console.log(this.userId);
    }
  }
};
</script>
<style scoped>
.alignbut {
  position: right;
}
.alignimg {
  position: absolute;
  bottom: 10px;
  margin-left: 45px;
  margin-bottom: 15px;

  width: 70%;
  border: 3px solid #bd3a96;
}
.align {
  padding: 2em 0.5em;
  text-align: center;
}
.toolbar-title {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 25px;
  letter-spacing: 5px;
  font-weight: bold;
  color: gainsboro;
}
.text {
  /* text-shadow: 0.5px 0 0 #fff, -0.5px 0 0 #fff, 0 0.5px 0 #fff, 0 -0.5px 0 #fff,
    0.5px 0.5px #fff, -0.5px -1px 0 #fff, 1px -1px 0 #fff, -0.5px 0.5px 0 #fff; */
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 15.8px;
  font-weight: bold;
  color: #e0e0e0;
}
.butcol {
  font-size: 10px;
  margin-right: 60px;
  display: flex;
}
.qtem {
  color: rgb(180, 179, 179);
  font-size: 17px;
  font-family: monospace;
  background-color: rgba(17, 24, 39, 1);
  position: relative;
  cursor: pointer;
  border-radius: 0 42px 42px 0;
}
.qtem:hover {
  color: rgb(255, 255, 255);
}

.ss {
  color: rgb(248, 242, 242);
  mix-blend-mode: lighten;
}
</style>
