<template>
  <q-card
    class="q-px-lg"
    style="width: 700px ; height: 600px ; background: #EAF2F8"
  >
    <q-form
      @submit="onSubmit"
      @reset="onCancel"
      class="q-gutter-md"
      ref="myForm"
    >
      <q-input
        filled
        v-model="userCopy.nom"
        label="Nom"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="userCopy.prenom"
        label="Prénom"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input
        filled
        v-model="userCopy.date_naissance"
        label="Date de naissance"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-select
        label="Genre"
        filled
        v-model="userCopy.genre"
        :options="genreOptions"
      />
      <q-input
        filled
        v-model="userCopy.email"
        label="Email"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-input filled v-model="userCopy.ville" label="Ville" />
      <q-input filled v-model="userCopy.rue" label="Rue" />
      <q-input filled v-model="userCopy.code_postal" label="Code Postal" />
      <q-input
        filled
        v-model="userCopy.telephone"
        label="Téléphone"
        type="number"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />
      <q-select
        label="Etat"
        filled
        v-model="userCopy.etat"
        :options="etatOptions"
      >
      </q-select>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Cancel" type="cancel" color="red" flat class="q-ml-sm" />
      </div>
    </q-form>
  </q-card>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],
      name: "",

      userCopy: {}
    };
  },

  methods: {
    async onSubmit() {
      //  this.$refs.myForm.validate().then(async success => {
      ////    if (success) {
      ////    let res = await this.$axios.post(`/client/`, {
      //...this.clientCopy
      //  });
      //  console.log(res);
      //   }
      //});
      //} else {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.post(`/utilisateur/`, {
            ...this.userCopy
          });

          window.location.reload(true);
        }
      });
      //  }
    },

    onCancel() {}
  },
  mounted() {
    this.userCopy = { ...this.user };
  }
};
</script>
