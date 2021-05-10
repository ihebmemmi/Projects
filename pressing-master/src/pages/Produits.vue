<template>
  <q-page class="q-pa-lg">
    <h4>Produits</h4>
    <!-- </q-card-section> -->

    <div>
      <q-btn
        align="left"
        glossy
        outline
        rounded
        v-close-popup
        text-color="primary"
        label="Ajouter un produit"
        color="white"
        @click="addProduit"
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
          @click="EditProduit"
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
          @click="deleteProduit"
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
      :data="produits"
      :columns="columns"
      row-key="_id"
      grid
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      hide-header
      hide-pagination
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
                    <q-item>
                      <q-item-section>
                        <q-item-label caption>Code</q-item-label>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{ props.row.code }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator vertical />
                    <q-item-section>
                      <q-item-label caption> Nom</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ props.row.nom }}</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-separator horizontal />
                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Categorie</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>
                        {{ categories[props.row.categorie] }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />
                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Service</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label>{{
                        services[props.row.service]
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />

                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Prix</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label
                        >{{ props.row.prix }}
                        <q-space></q-space> Dinars</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />

                  <q-item>
                    <q-item-section avatar>
                      <q-item-label caption>Etat</q-item-label>
                    </q-item-section>

                    <q-item-section class="absolute-center">
                      <q-item-label
                        ><q-badge
                          :class="
                            props.row.etat === 'Actif'
                              ? 'actifcss'
                              : 'inactifcss'
                          "
                          >{{ props.row.etat }}</q-badge
                        ></q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-separator horizontal />

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
    <!-- </q-page> -->
    <!-- <q-table
      :data="produits"
      :columns="columns"
      row-key="_id"
      selection="single"
      :selected.sync="selected"
    >
    </q-table>
    <template>
      <q-btn
        flat
        label="Delete"
        color="red"
        @click="deleteProduit"
        :disable="!selected.length"
      ></q-btn>
      <q-btn
        flat
        label="Edit"
        color="green"
        @click="EditProduit"
        :disable="!selected.length"
      ></q-btn>
      <q-btn flat label="Add" color="primary" @click="addProduit"></q-btn>
    </template>-->

    <q-dialog v-model="editDialog" v-if="editDialog">
      <produit-form :produit="selected[0]" @updated="getAll" />
    </q-dialog>
    <div class="row absolute-bottom q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="secondary"
        class="pagin"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </q-page>
</template>
<script>
import ProduitForm from "src/components/Forms/ProduitForm.vue";
export default {
  components: { ProduitForm },
  name: "Produits",
  data() {
    return {
      expanded: false,
      pagination: {
        rowsPerPage: 5,
        page: 1
      },
      filter: "",
      produits: [],
      categories: [],
      services: [],
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
        },

        {
          name: "imageUrl",
          label: "imageUrl (g)",
          align: "center",
          field: "imageUrl"
        },
        {
          name: "categorie",
          label: "Categorie",
          align: "center",
          field: "categorie"
        },
        {
          name: "service",
          label: "Service",
          align: "center",
          field: "service"
        },
        {
          name: "prix",
          label: "Prix",
          align: "center",
          field: "prix"
        }
      ],
      editDialog: false
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
    },
    async getAll() {
      let res = await this.$axios.get("/produit");
      this.produits = res.data;
      console.log(this.produits);
    },
    async getAllServices() {
      let res = await this.$axios.get("/service");
      let services = {};
      res.data.forEach(el => {
        services[el._id] = el.nom;
      });
      this.services = { ...services };
    },
    addProduit() {
      if (this.selected[0]) {
        return this.$q.notify({
          color: "warning",
          message: "produit selected"
        });
      } else {
        this.editDialog = true;
      }
    },
    async deleteProduit() {
      this.selected.forEach(element => {
        this.$axios.delete(`/produit/delete/${element._id}`);
      });
      await this.$emit("updated");
      window.location.reload(true);
    },
    EditProduit() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no client selected"
        });
      }
      this.editDialog = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.produits.length / this.pagination.rowsPerPage);
    }
  },
  async created() {
    await this.getAllServices();
    await this.getAll();
    //  await this.getServ();
    await this.getAllCategories();
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
