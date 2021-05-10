<template>
  <!-- <q-card>
    <div>
      <h3>
        Hello
      </h3>
      <div>
        <h3>{{ this.userdata.email }}</h3>
      </div>
      <button @click="logUserOut">Logout</button>
    </div>
  </q-card> -->
  <div>
    <h4>Bonjour {{ this.userdata.prenom }}</h4>

    <q-card class="profilcard">
      <q-card-section horizontal>
        <q-card-section class="col-5 flex flex-center">
          <q-btn
            class="absolute-top"
            outline
            rounded
            @click="EditUser()"
            v-close-popup
            label="Modifier"
            color="green"
          ></q-btn>
          <!-- <div class="absolute-top">Données d'utilisateur</div> -->
          <br />
          <q-img
            @click="EditUser()"
            v-if="!this.userdata.imageUrl"
            class="image"
            src="https://i.skyrock.net/7045/53217045/pics/2749180896_small_1.png"
          />

          <q-img
            v-if="this.userdata.imageUrl"
            class="image"
            :src="this.userdata.imageUrl"
          />
        </q-card-section>
        <q-separator vertical />
        <q-card-section class="q-pt-xs">
          <!-- <q-card-section class="col-1 flex flex-center">
            <q-img class="image" :src="this.userdata.imageUrl" />
          </q-card-section> -->
          <!-- <div class="text-h4 q-mt-sm q-mb-xs">
            Title
          </div> -->

          <br />
          <span class="text1">Nom</span
          ><span class="text2"> {{ this.userdata.nom }}</span>
          <br />
          <span class="text1">Prenom</span
          ><span class="text2"> {{ this.userdata.prenom }}</span>
          <br />

          <span class="text1">Genre</span
          ><span class="text2"> {{ this.userdata.genre }}</span>
          <br />
          <span class="text1">Email</span
          ><span class="text2"> {{ this.userdata.email }}</span>
          <br />

          <span class="text1">Date de naissance</span
          ><span class="text2"> {{ this.userdata.date_naissance }}</span>
          <br />

          <span class="text1">Télephone</span
          ><span class="text2"> {{ this.userdata.telephone }}</span>
          <br />
          <span class="text1">Ville</span
          ><span class="text2"> {{ this.userdata.ville }}</span>
          <br />
          <span class="text1">Rue</span
          ><span class="text2"> {{ this.userdata.rue }}</span>
          <br />
          <span class="text1">Code Postal</span
          ><span class="text2"> {{ this.userdata.code_postal }}</span>
          <br />
          <span class="text1">Etat</span
          ><span class="text2"> {{ this.userdata.etat }}</span>
          <br />
        </q-card-section>
        <!-- <q-separator vertical /> -->
        <!-- 
        <q-card-section class="col-1 flex flex-center">
          <q-img class="image" :src="this.userdata.imageUrl" />
        </q-card-section> -->
      </q-card-section>
    </q-card>
    <q-dialog v-model="editDialog" v-if="editDialog">
      <profil-form :userdata="userdata" />
    </q-dialog>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";

import ProfilForm from "src/components/Forms/ProfilForm.vue";
export default {
  components: { ProfilForm },
  data() {
    return {
      user: [],
      userdata: [],
      editDialog: false
    };
  },
  created() {
    this.getUser();
    this.getUserData();
  },
  methods: {
    EditUser() {
      this.editDialog = true;
    },
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
.text1 {
  color: #bd3a96;
  font-family: monospace;
  font-size: 22px;
}

.text2 {
  color: rgb(0, 0, 0);
  font-family: monospace;
  font-size: 20px;
}
.profilcard {
  margin: 5rem auto;
  max-width: 65rem;
  box-shadow: 0 0px 25px rgba(0, 0, 0, 0.39);
  padding: 1.5rem;
  background-color: white;
}
.image {
  max-width: 270px;
  border: 5px solid #0d1647;
}
h4 {
  font-family: monospace;
  font-size: 2em;
  margin-top: 1.33em;
  color: #140263;
  margin-bottom: 1em;
  margin-left: 1em;
  margin-right: 0;
  letter-spacing: 3px;
  font-weight: bold;
}
</style>
