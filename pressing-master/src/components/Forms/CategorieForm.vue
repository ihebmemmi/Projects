<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-dark text-white" ref="myForm">
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="categorieCopy.imageUrl"
        label="Image URL"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="image"
            />
          </div>
        </template>
      </q-input>
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="categorieCopy.code"
        label="Code"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon class="q-mr-xs" color="secondary" size="20px" name="code" />
          </div>
        </template>
      </q-input>
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="categorieCopy.nom"
        label="Nom"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="person"
            />
          </div>
        </template>
      </q-input>
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="categorieCopy.description"
        label="Description"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="description"
            />
          </div>
        </template>
      </q-input>
      <q-select
        dark
        rounded
        outlined
        color="secondary"
        v-model="categorieCopy.etat"
        label="Etat"
        :options="etatOptions"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="light"
            />
          </div>
        </template>
      </q-select>
      <!-- <q-card
    class="q-px-lg"
    style="width: 700px ; height: 600px ; background: #EAF2F8"
  >
    <q-form @submit="onAdd" @reset="onCancel" class="q-gutter-md" ref="myForm">
      <q-input
        filled
        v-model="categorieCopy.nom"
        label="Nom"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      />

      <q-input filled v-model="categorieCopy.description" label="description" />
      <q-input filled v-model="categorieCopy.imageUrl" label="imageUrl" />

      <q-input filled v-model="categorieCopy.code" label="Code" />

      <q-select
        label="Etat"
        filled
        v-model="categorieCopy.etat"
        :options="etatOptions"
      >
      </q-select> -->

      <!--  <q-select label="Categorie">
        <option
          v-for="categorie in categorie"
          :key="categorie._id"
          :value="categorie._id"
        >
          {{ categorie.nom }}
        </option>
      </q-select>-->

      <div>
        <q-btn
          v-if="!this.categorie"
          label="Ajouter"
          outline
          style="margin-right: 15px"
          rounded
          @click="onAdd()"
          color="blue"
        />

        <q-btn
          v-if="this.categorie"
          style="margin-right: 15px"
          label="Modifier"
          outline
          rounded
          @click="onEdit()"
          color="green"
        />

        <q-btn
          @click="onCancel()"
          label="Annuler"
          style="margin-right: 15px"
          outline
          rounded
          v-close-popup
          color="red"
        />
      </div>
    </q-form>
  </q-card>
</template>
<script>
export default {
  props: ["categorie"],
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],

      categorieCopy: {}
    };
  },

  methods: {
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.post(`/categorie/`, {
            ...this.categorieCopy
          });
          window.location.reload(true);

          this.$emit("updated");

          await this.getAll();
        }
      });
    },
    async onEdit() {
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
          let res = await this.$axios.patch(
            `/categorie/update/${this.categorie._id}`,
            {
              ...this.categorieCopy
            }
          );
          window.location.reload(true);

          this.$emit("updated");

          await this.getAll();
        }
      });
    },

    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.categorieCopy = { ...this.categorie };
  }
};
</script>
<style>
.mydialog {
  width: 500px;
  padding: 15px;
  height: 480px;
  background: rgb(32, 29, 29);
}
</style>
