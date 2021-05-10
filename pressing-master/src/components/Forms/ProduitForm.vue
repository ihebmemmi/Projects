<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-dark text-white" ref="myForm">
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="produitCopy.imageUrl"
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
        v-model="produitCopy.code"
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
        v-model="produitCopy.nom"
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
        v-model="produitCopy.description"
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
        v-model="produitCopy.etat"
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
      <!-- select services -->

      <!-- <q-select
        dark
        rounded
        outlined
        color="secondary"
        v-model="produitCopy.service"
        label="service"
        :options="services.nom"
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
      </q-select> -->

      <!-- select services -->
      <div>
        <label>
          Categorie
        </label>
        <select v-model="produitCopy.categorie">
          <option
            v-for="categ in categories"
            :key="categ._id"
            :value="categ._id"
          >
            {{ categ.nom }}
          </option>
        </select>

        <label>
          Service
        </label>
        <select v-model="produitCopy.service">
          <option v-for="serv in services" :key="serv._id" :value="serv._id">
            {{ serv.nom }}
          </option>
        </select>
      </div>
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />
      <q-separator />

      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="produitCopy.prix"
        label="Prix"
        lazy-rules
        :rules="[val => (val && val.length > 0) || 'Please type something']"
      >
        <template v-slot:prepend>
          <div class="row items-center all-pointer-events">
            <q-icon
              class="q-mr-xs"
              color="secondary"
              size="20px"
              name="monetization_on"
            />
          </div>
        </template>
      </q-input>
      <q-separator />
      <div>
        <div>
          <q-btn
            v-if="!this.produit"
            label="Ajouter"
            outline
            style="margin-right: 15px"
            rounded
            @click="onAdd()"
            color="blue"
          />

          <q-btn
            v-if="this.produit"
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
      </div>
    </q-form>
  </q-card>
</template>

<script>
export default {
  props: ["produit"],
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],
      categories: [],
      services: [],
      produitCopy: {}
    };
  },

  methods: {
    async getAllCategories() {
      let res = await this.$axios.get("/categorie");
      let categories = {};
      res.data.forEach(el => {
        categories[el._id] = el.nom;
      });
      this.categories = { ...categories };
      // console.log(this.categories);
    },
    async getAllServices() {
      let res = await this.$axios.get("/service");
      let services = {};
      res.data.forEach(el => {
        services[el._id] = el.nom;
      });
      this.services = { ...services };
      console.log(this.services);
    },
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.post(`/produit/`, {
            ...this.produitCopy
          });
          window.location.reload(true);

          this.$emit("updated");

          await this.getAll();
        }
      });
    },
    async getCat() {
      let res = await this.$axios.get(`/categorie`);
      this.categories = res.data;
      //console.log(this.categories);
    },
    async getServ() {
      let res = await this.$axios.get("/service");
      this.services = res.data;
      // console.log(this.services);
    },
    // async onSubmit() {
    //   this.$refs.myForm.validate().then(async success => {
    //     if (success) {
    //       let res = await this.$axios.post(`/products/`, {
    //         ...this.produitCopy
    //       });
    //       console.log(res);
    //     }
    // });
    //} else {
    // this.$refs.myForm.validate().then(async success => {
    //   if (success) {
    //     let res = await this.$axios.patch(
    //       `/produit/update/${this.produit._id}`,
    //       {
    //         ...this.produitCopy
    //       }
    //     );
    //     this.$emit("updated");

    //     if (res.status === "200") {
    //       await this.getAll();
    //     }
    //   }
    // });
    //  }
    async onEdit() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.patch(
            `/produit/update/${this.produit._id}`,
            {
              ...this.produitCopy
            }
          );
          window.location.reload(true);

          this.$emit("updated");

          await this.getAll();
        }
      });
    }
  },

  onCancel() {
    this.$emit("closeDialog");
  },

  async mounted() {
    this.produitCopy = { ...this.produit };
    await this.getCat();
    await this.getServ();
  }
};
</script>
<style>
label {
  color: rgb(202, 201, 201);
}
.mydialog {
  width: 500px;
  padding: 15px;
  height: 480px;
  background: rgb(32, 29, 29);
}
select {
  width: 100%;
  color: whitesmoke;
  max-width: 150px;
  border: 1px solid gray;
  border-radius: 5.25em;
  padding: 0.25em 0.5em;
  font-size: 0.9rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: rgb(32, 29, 29);
  background-image: rgb(32, 29, 29);
}
</style>
