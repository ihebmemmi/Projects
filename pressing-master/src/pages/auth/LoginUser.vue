<template>
  <div>
    <!-- <q-img src="~assets/logopressing.png" class="center" style="width: 350px" /> -->
    <q-form @submit="Login" @reset="onReset">
      <q-img src="~assets/tel.png" style="width: 35px" />
      <br />
      <div class="align">
        <q-img src="~assets/logopressing.png" style="width: 350px" />
      </div>
      <br />
      <div class="titre">
        Se Connecter !
      </div>
      <br />
      <div class="form-control">
        <q-input
          rounded
          outlined
          type="email"
          v-model="login.email"
          label="Email"
          hint="Email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-control">
        <q-input
          rounded
          outlined
          :type="isPwd ? 'password' : 'text'"
          v-model="login.password"
          hint="Mot de passe"
          label="Mot de passe"
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
      <!-- <q-toggle
        v-model="accept"
        color="primary"
        keep-color
        label="se souvenir de moi ?"
        class="text-overline"
      /> -->
      <br />
      <div class="align">
        <div class="form-control">
          <q-btn
            label="Connecter"
            type="submit"
            icon-right="login"
            glossy
            rounded
            class="butcol"
          />
          <q-btn
            label="Réinitialiser"
            type="reset"
            rounded
            icon-right="cancel"
            color="red"
            flat
            class="q-ml-sm"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPwd: true,
      login: {
        email: null,
        password: null
      }

      // accept: false
    };
  },

  methods: {
    async Login() {
      // if (login.email === null || login.password === null) {
      //   return (
      //     this.$q.notify({
      //       color: "red",
      //       message: "Veuillez remplir tout les champs"
      //     }),
      //     this.$router.push("/register")
      //   );
      // } else {
      try {
        let res = await this.$axios.post(`/utilisateur/login`, this.login);
        let token = res.data.token;
        localStorage.setItem("token", token);
        if (token) {
          console.log("acces, token: ", token);
          return (
            this.$q.notify({
              color: "warning",
              message: "Connexion avec succés"
            }),
            this.$router.push("/Profile")
          );
        }
      } catch (err) {
        console.log("failed", err.res);
        return this.$q.notify({
          color: "red",
          message: "Vérifiez vos données"
        });
      }
      // if (res) {
      //   console.log("acces");
      //   this.$router.push("/");
      // } else {
      //   console.log("failed");
      // }
      // if (this.accept !== true) {
      //   this.$q.notify({
      //     color: "red-5",
      //     textColor: "white",
      //     icon: "warning",
      //     message: "You need to accept the license and terms first"
      //   });
      // } else {
      //   this.$q.notify({
      //     color: "green-4",
      //     textColor: "white",
      //     icon: "cloud_done",
      //     message: "Submitted"
      //   });
      // }
    },

    onReset() {
      this.login.email = null;
      this.login.password = null;
      // this.accept = false;
    }
  }
};
</script>

<style scoped>
form {
  margin: 5rem auto;
  max-width: 45rem;
  border-radius: 50px;
  box-shadow: 0 0px 25px rgba(30, 43, 221, 0.39);
  padding: 1.5rem;
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
