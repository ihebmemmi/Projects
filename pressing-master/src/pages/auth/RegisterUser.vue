<template>
  <div>
    <form @submit.prevent="registerUser">
      <q-img style="max-width:55px" src="~assets/rrrr.png" />
      <br />
      <div class="titre">
        Créer votre compte ici !
      </div>
      <br />
      <br />

      <div class="form-control">
        <q-input
          rounded
          outlined
          v-model="register.nom"
          label="Nom"
          hint="Entrez votre nom de famille"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-control">
        <q-input
          rounded
          outlined
          v-model="register.prenom"
          label="Prénom"
          hint="Entrer votre prénom"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
      </div>

      <div class="form-control">
        <q-input
          rounded
          outlined
          type="email"
          v-model="register.email"
          label="Email"
          hint="Entrez votre Email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <!-- <q-input
        filled
        v-model="tel"
        label="Téléphone"
        hint="Téléphone"
        lazy-rules
        type="number"
        :rules="[val => (val && val > 0) || 'Please type something']"
      />-->
      <div class="form-control">
        <q-input
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="register.password"
          hint="Mot de passe"
          label="*****************"
          lazy-rules
          :rules="[val => (val !== null && val !== '') || 'Champ vide * ']"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="form-control">
        <q-input
          rounded
          outlined
          :type="isPwd2 ? 'password' : 'text'"
          v-model="confirmPassword"
          hint="Confirmer votre mot de passe"
          label="*****************"
          lazy-rules
          :rules="[
            val =>
              (val !== null && val !== '') ||
              'Veuillez confirmer votre mot de passe'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd2 ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd2 = !isPwd2"
            />
          </template>
        </q-input>
      </div>
      <!-- <div>
        <q-toggle
          v-model="accept"
          color="secondary"
          keep-color
          label="Confirmer les termes ?"
          class="text-overline"
        />
      </div> -->
      <br />
      <div class="align">
        <q-btn
          class="butcol"
          label="s'inscrire"
          icon-right="login"
          type="submit"
          glossy
          rounded
        />
        <q-btn
          @click="onReset()"
          label="Réinitialiser"
          icon-right="cancel"
          color="red"
          rounded
          flat
          class="q-ml-sm"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterUser",

  data() {
    return {
      isPwd2: true,

      isPwd: true,
      register: {
        prenom: null,
        nom: null,
        password: null,
        email: null
      },
      confirmPassword: null
      //accept: false
    };
  },
  methods: {
    onReset() {
      this.register.prenom = null;
      this.register.nom = null;
      this.register.password = null;
      this.register.email = null;
      this.confirmPassword = null;
    },
    async registerUser() {
      if (
        this.confirmPassword === "" ||
        this.register.password === null ||
        this.register.nom === null ||
        this.register.email === null ||
        this.register.prenom === null
      ) {
        return this.$q.notify({
          color: "red",
          message: "Veuillez remplir tout les champs"
        });
      } else if (this.register.password != this.confirmPassword) {
        return this.$q.notify({
          color: "red",
          message: "Confirmez votre mot de passe"
        });
      } else if (this.register.password === this.confirmPassword) {
        try {
          let response = await this.$axios.post(
            "/utilisateur/register",
            this.register
          );
          console.log(response);
          // let token = response.data.token;
          // if (token) {
          //   localStorage.setItem("jwt", token);
          //this.$router.push("/");
          console.log("succes");
          return (
            this.$q.notify({
              color: "warning",
              message: "succes, utilisateur créer"
            }),
            this.$router.push("/login")
          );
        } catch {
          return this.$q.notify({
            color: "red",
            message: "Email deja utilisé"
          });
        }
      }
    }
  }
};
</script>
<style scoped>
form {
  margin: 5rem auto;
  max-width: 45rem;
  border-radius: 50px;
  box-shadow: 0 0px 25px rgba(74, 72, 209, 0.39);
  padding: 2.5rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
}
.butcol {
  color: gainsboro;
  background-color: #1a037e;
}
.align {
  display: flex;
  align-items: center;
  justify-content: center;
}
.titre {
  color: #0b2657;

  /* background: repeating-linear-gradient(to right, #4d65d0, #fab9f8); 
   background-clip: text;
  -webkit-text-fill-color: transparent; */
  font-weight: bold;
  font-style: italic;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-family: "Courier New", Courier, monospace;
}
</style>
