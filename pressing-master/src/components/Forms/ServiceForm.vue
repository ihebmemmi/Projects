<template>
  <q-card class="mydialog">
    <q-form class="q-pa-md bg-dark text-white" ref="myForm">
      <q-input
        dark
        rounded
        outlined
        color="secondary"
        v-model="serviceCopy.imageUrl"
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
        v-model="serviceCopy.code"
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
        v-model="serviceCopy.nom"
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
        v-model="serviceCopy.description"
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
        v-model="serviceCopy.etat"
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

      <div>
        <div>
          <q-btn
            v-if="!this.service"
            label="Ajouter"
            outline
            style="margin-right: 15px"
            rounded
            @click="onAdd()"
            color="blue"
          />

          <q-btn
            v-if="this.service"
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
  props: ["service"],
  data() {
    return {
      // genreOptions: ["Homme", "Femme"],
      etatOptions: ["Actif", "Inactif"],

      serviceCopy: {}
    };
  },

  methods: {
    //  async onSubmit() {
    //   this.$refs.myForm.validate().then(async success => {
    //   if (success) {
    //   let res = await this.$axios.post(`/service/`, {
    //   ...this.serviceCopy
    ////  });

    // if (res.status === "200") {
    //   await this.getAll();
    //  }
    //  }
    // });
    //  }
    // },
    async onAdd() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          let res = await this.$axios.post(`/service/`, {
            ...this.serviceCopy
          });
          window.location.reload(true);

          this.$emit("updated");

          await this.getAll();
        }
      });
    },
    async onEdit() {
      this.$refs.myForm.validate().then(async success => {
        if (success) {
          console.log(this.service);
          let res = await this.$axios.patch(
            `/service/update/${this.service._id}`,
            {
              ...this.serviceCopy
            }
          );
          window.location.reload(true);

          this.$emit("updated");

          await this.getAll();
        }
      });
      //  }
    },

    onCancel() {
      this.$emit("closeDialog");
    }
  },
  mounted() {
    this.serviceCopy = { ...this.service };
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
