<template>
  <q-page class="q-pa-lg">
    <!-- <q-table
      title="Categories"
      :data="categories"
      :columns="columns"
      row-key="_id"
      selection="single"
      :selected.sync="selected"
    > -->
    <!-- <q-card class="my-card">
      <q-card-section class="bg-primary text-white"> -->
    <h4>Categories</h4>
    <!--<div class="text-subtitle2">by John Doe</div> -->
    <!-- </q-card-section> -->

    <!-- <q-separator />
      <q-card-actions align="left">
        <q-btn
          label="Ajouter une categorie"
          color="primary"
          @click="addCategorie"
          :disable="selected.length > 0"
        ></q-btn>
        <q-btn
          label="Supprimer"
          color="red"
          @click="deleteCategorie"
          :disable="!selected.length"
        ></q-btn>
        <q-btn
          label="Modifier"
          color="green"
          @click="EditCategorie"
          :disable="!selected.length"
        ></q-btn>
      </q-card-actions>
    </q-card> -->
    <!-- <template>
      <div class="absolute-right"> -->
    <!-- <q-btn
          flat
          label="Delete"
          color="red"
          @click="deleteCategorie"
          :disable="!selected.length"
        ></q-btn>
        <q-space />
        <q-btn
          flat
          label="Edit"
          color="green"
          @click="EditCategorie"
          :disable="!selected.length"
        ></q-btn> -->
    <!-- <q-space /> -->

    <!-- <q-btn flat label="Add" color="primary" @click="addCategorie"></q-btn> -->
    <!-- </div>
    </template> -->
    <!-- </q-table> -->
    <div>
      <q-btn
        align="left"
        glossy
        outline
        rounded
        v-close-popup
        text-color="primary"
        label="Ajouter une categorie"
        color="white"
        @click="addCategorie"
        :disable="selected.length > 0"
      ></q-btn>
      <div align="right">
        <q-btn
          align="right"
          outline
          rounded
          v-close-popup
          glossy
          label="Modifier"
          color="green"
          @click="EditCategorie"
          :disable="!selected.length || selected.length > 1"
        ></q-btn>
        <q-btn
          align="right"
          outline
          glossy
          rounded
          v-close-popup
          label="Supprimer"
          color="red"
          @click="deleteCategorie"
          :disable="!selected.length"
        ></q-btn>
      </div>
    </div>

    <!-- <q-separator /> -->

    <q-space />
    <br />
    <div>
      <q-input
        class="searchy"
        dense
        v-model="filter"
        placeholder="  Chercher...."
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <br />

    <q-table
      :filter="filter"
      :data="categories"
      :columns="columns"
      row-key="_id"
      grid
      selection="multiple"
      :pagination.sync="pagination"
      :selected.sync="selected"
      hide-pagination
      hide-header
    >
      <template #item="props">
        <div
          class="mycard"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card class="mycard" :class="props.selected ? 'bg-grey-3' : ''">
            <q-card-section>
              <q-checkbox
                dense
                v-model="props.selected"
                :label="props.row.name"
              />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-card :class="props.selected ? 'bg-grey-3' : ''">
                <!-- {{ props.row.imageUrl }} -->
                <img class="mycard" :src="props.row.imageUrl" />
                <q-separator horizontal />

                <q-list>
                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Nom</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>{{ props.row.nom }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />

                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Etat</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>
                        <q-badge
                          :class="
                            props.row.etat === 'Actif'
                              ? 'actifcss'
                              : 'inactifcss'
                          "
                        >
                          {{ props.row.etat }}
                        </q-badge>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />
                  <!-- <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Description</q-item-label>
                    </q-item-section>
                    <q-separator vertical />
                    <q-item-section>
                      <q-item-label class="absolute-center">
                        {{ props.row.description }}</q-item-label
                      >
                    </q-item-section>
                  </q-item> -->
                  <!-- description list -->
                  <q-card-actions>
                    <label caption>
                      Description
                    </label>

                    <q-space />

                    <q-btn
                      color="grey"
                      round
                      flat
                      dense
                      :icon="
                        expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
                      "
                      @click="expanded = !expanded"
                    />
                  </q-card-actions>
                  <q-slide-transition>
                    <div v-show="expanded">
                      <q-card-section class="text-subitle2">
                        {{ props.row.description }}
                      </q-card-section>
                    </div>
                  </q-slide-transition>
                </q-list>
              </q-card>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="editDialog" v-if="editDialog">
      <categorie-form :categorie="selected[0]" @updated="getAll" />
    </q-dialog>
    <div class=" absolute-bottom q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="secondary"
        class="pagin"
        size="sm"
        :max="pagesNumber"
      />
    </div>
  </q-page>
</template>
<script>
import CategorieForm from "src/components/Forms/CategorieForm.vue";
export default {
  components: { CategorieForm },
  name: "Categories",
  data() {
    return {
      expanded: false,
      categories: [],
      filter: "",
      etatcss: true,
      pagination: {
        rowsPerPage: 5,
        page: 1
      },
      selected: [],
      columns: [
        {
          name: "nom",
          label: "Nom",
          align: "center",
          field: "nom"
        },
        {
          name: "code",
          label: "Code",
          align: "center",
          field: "code"
        },
        {
          name: "etat",
          field: "etat",
          label: "Etat",
          align: "center"
        },
        {
          name: "imageUrl",
          label: "imageUrl",
          align: "center",
          field: "imageUrl"
        },

        {
          name: "description",
          align: "center",
          label: "Descriotion",
          field: "description"
        }
      ],
      editDialog: false
    };
  },
  methods: {
    reverse() {
      return !this.expanded;
    },
    async getAll() {
      let res = await this.$axios.get("/categorie");
      this.categories = res.data;
    },
    addCategorie() {
      if (this.selected[0]) {
        return this.$q.notify({
          color: "warning",
          message: "Categorie selected"
        });
      } else {
        this.editDialog = true;
      }
    },
    async deleteCategorie() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no Categorie selected"
        });
      }
      this.selected.forEach(element => {
        this.$axios.delete(`/categorie/delete/${element._id}`);
      });
      await this.$emit("updated");
      window.location.reload(true);
      // window.location.reload(true);

      // let res = await this.$axios.delete(
      //   `/categorie/delete/${this.selected[0]._id}`
      // );
      // if (res.status === 200) {
      //   return (
      //     this.$q.notify({
      //       color: "red",
      //       message: "Categorie deleted"
      //     }),
      // );
      //  }
    },
    EditCategorie() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no Categorie selected"
        });
      }
      this.editDialog = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.categories.length / this.pagination.rowsPerPage);
    }
  },
  watch: {},
  async mounted() {
    await this.getAll();
  }
};

//  async asyncData() {
//   try {
//    let categories = await this.$axios.get("/categorie");
//    let services = await this.$axios.get("/service");
//   const { catResponse, servResponse } = await Promise.all([
//    categories,
//    services
//  ]);
//  console.log(catResponse);

// return {
//   categories: catResponse,
//   services: servResponse
//  };
//  } catch (err) {
//    console.log(err);
//  }
// },
</script>
<style scoped>
.mycard {
  width: 200px;
  height: 160px;
  margin-right: 20px;
}
.actifcss {
  background-color: green;

  color: white;
}
.inactifcss {
  background-color: red;
  color: white;
}
.searchy {
  max-width: 250px;
  border: 1px solid black;
}
h4 {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 2.37em;
  margin-top: 0.33em;
  color: #1a037e;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0;
  letter-spacing: 3px;
  font-weight: bold;
}
.pagin {
  margin-left: 750px;
  margin-bottom: 20px;
}
</style>
