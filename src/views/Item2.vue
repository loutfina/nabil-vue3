<template>
  <div class="home container mt-4">
    <div class="text-center">
      <h1>Recherche Annexe</h1>
    </div>

    <div class="card">
      <div class="card-header">Critères de recherche</div>
      <div class="card-body">
        <div class="row mb-2 g-3 align-items-center">
          <div class="col-3">
            <label for="vin" class="col-form-label">Identifiant</label>
          </div>
          <div class="col-5">
            <input type="text" id="vin" class="form-control"  v-model="vin">
          </div>
        </div>
        <div class="row mb-2 g-3 align-items-center">
          <div class="col-3">
            <label for="vrn" class="col-form-label">Matricule</label>
          </div>
          <div class="col-5">
            <input type="text" id="vrn" class="form-control"  v-model="vrn">
          </div>
        </div>
        <div class="row mb-2 g-3 align-items-center">
          <div class="col-3" />
          <div class="col-5 buttons">
            <o-button variant="primary" v-on:click="search"  iconPack="fas" icon-left="search"> Rechercher </o-button>
          </div>
        </div>
      </div>
    </div>

      <div class="card  mt-4">
        <div class="card-header">Liste répondant aux critères de recherche</div>
        <div class="card-body">

          <div class="row mb-2 g-3 align-items-center">
            <div class="col-12" v-if="!detailResult">          
              <o-table
                :data="result ? result : []"
                :paginated="false"
                :default-sort-direction="'asc'"
                :sort-icon="'arrow-up'"
                :loading="status=='pending'"
                :narrowed="true"
                :striped="true"
                :hoverable="true"
                :iconPack="'fas'"
                :default-sort="'vrn'"
                @click="showDetail"
              >
                <o-table-column field="vrn" label="N° identifiant" sortable v-slot="props">
                  {{ props.row.vrn }}
                </o-table-column>
                <o-table-column field="vin" label="N° matricule" sortable v-slot="props">
                  {{ props.row.vin }}
                </o-table-column>

              </o-table>
            </div>
            <div class="col-12" v-if="detailResult">          
              <o-table
                :data="result ? result : []"
                :paginated="false"
                :default-sort-direction="'asc'"
                :sort-icon="'arrow-up'"
                :loading="status=='pending'"
                :narrowed="true"
                :striped="true"
                :iconPack="'fas'"
                :default-sort="'effectiveDate'"
                >
                <o-table-column field="OP" label="Code op" sortable position="centered" v-slot="props">
                  {{ props.row.OP }}
                </o-table-column>
                <o-table-column field="CA" label="Code CA" sortable v-slot="props">
                  {{ props.row.CA }}
                </o-table-column>
                <o-table-column field="police" label="N°" sortable numeric v-slot="props">
                  {{ props.row.police }}
                </o-table-column>
                <o-table-column field="avenant" label="N° annexe" sortable numeric v-slot="props">
                  {{ props.row.avenant }}
                </o-table-column>
                <o-table-column field="receptionDate" label="Date de réception" sortable position="centered" v-slot="props">
                  {{ new Date(props.row.receptionDate).toLocaleDateString() }}
                </o-table-column>
                <o-table-column field="sendDate" label="Date d'émission" sortable position="centered" v-slot="props">
                  {{ new Date(props.row.sendDate).toLocaleDateString() }}
                </o-table-column>
                <o-table-column field="effectiveDate" label="Date d'effet" sortable position="centered" v-slot="props">
                  {{ new Date(props.row.effectiveDate).toLocaleDateString() }}
                </o-table-column>
                <o-table-column field="label" label="Libellé marque" sortable v-slot="props">
                  {{ props.row.label }}
                </o-table-column>
              </o-table>
            </div>
          </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapState } from 'vuex'

@Options({
  data: () => ({ 
    vin: null,
    vrn: null,
    checkDatetime: null,
    is_rg: false,
    detailResult: false
  }),
  methods: {
    // TODO : create 2 methods to get liste or detail
    search(vin:string, vrn:string){
      this.$store.dispatch('item2Slice/search',{ vin, vrn })
      this.detailResult = (!!vin && !!vrn);
    },
    showDetail(row:any){
      this.vin =  row.vin;
      this.vrn = row.vrn;
      this.search(this.vin, this.vrn);
    }  
  },
  computed: {
    ...mapState( 'item2Slice',  ['result','status'])
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
// increase original bootstrap switch
.form-switch .form-check-input[type=checkbox] {
    border-radius: 2em;
    height: 25px;
    width: 50px;
}
</style>