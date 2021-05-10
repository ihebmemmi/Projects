<template>
  <q-page class="q-pa-lg">
    <!-- <q-card> -->
    <!-- <q-card-section class="bg-primary text-white"> -->
    <h4>Services</h4>
    <!-- <div class="text-subtitle2">by John Doe</div> -->
    <!-- </q-card-section> -->

    <!-- <q-separator />
      <q-card-actions align="left">
        <q-btn
          label="Ajouter un service"
          color="primary"
          @click="addService"
          :disable="selected.length > 0"
        ></q-btn>
        <q-btn
          label="Supprimer"
          color="red"
          @click="deleteService"
          :disable="!selected.length"
        ></q-btn>
        <q-btn
          label="Modifier"
          color="green"
          @click="EditService"
          :disable="!selected.length"
        ></q-btn>
      </q-card-actions>
    </q-card> -->
    <div>
      <q-btn
        align="left"
        glossy
        outline
        rounded
        v-close-popup
        text-color="primary"
        label="Ajouter un service"
        color="white"
        @click="addService"
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
          @click="EditService"
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
          @click="deleteService"
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
      :data="services"
      :columns="columns"
      row-key="_id"
      grid
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
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

    <!--  Carte   -->

    <!--<q-data-table
      selection="single"
      :data="services"
      row-key="_id"
      :columns="columns"
      :selected.sync="selected"
    > -->
    <div class="q-pa-md row items-start q-gutter-md"></div>

    <q-dialog v-model="editDialog" v-if="editDialog">
      <service-form :service="selected[0]" @updated="getAll" />
    </q-dialog>
    <div class="absolute-bottom q-mt-md">
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
import ServiceForm from "src/components/Forms/ServiceForm.vue";
export default {
  components: { ServiceForm },
  name: "Services",
  data() {
    return {
      pagination: {
        rowsPerPage: 5,
        page: 1
      },
      filter: "",
      //categories: [],
      etatcss: true,
      expanded: false,
      services: [],
      selected: [],
      // filter: "",

      columns: [
        {
          name: "_id",
          label: "Id",
          align: "center",
          field: "_id"
        },
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
    async getAll() {
      let res = await this.$axios.get("/service");
      this.services = res.data;
    },
    addService() {
      if (this.selected[0]) {
        return this.$q.notify({
          color: "warning",
          message: "service selected"
        });
      } else {
        this.editDialog = true;
      }
    },
    async deleteService() {
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "aucun service selectionné"
        });
      }
      this.selected.forEach(element => {
        this.$axios.delete(`/service/delete/${element._id}`);
      });
      //  window.location.reload(true);

      // let res = await this.$axios.delete(
      //   `/service/delete/${this.selected[0]._id}`
      // );
      // if (res.status === 204) {
      //   return (
      //     this.$q.notify({
      //       color: "red",
      //       message: "Service Supprimé"
      //     }),
      await this.$emit("updated");
      window.location.reload(true);

      // );
      // }
    },
    EditService() {
      console.log(this.selected);
      if (!this.selected[0]._id) {
        return this.$q.notify({
          color: "warning",
          message: "no Service selected"
        });
      }
      this.editDialog = true;
    }
  },
  computed: {
    pagesNumber() {
      return Math.ceil(this.services.length / this.pagination.rowsPerPage);
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
}
.searchy {
  background-color: rgb(233, 233, 233);
  max-width: 250px;
  border: 1px solid rgb(197, 133, 166);
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
