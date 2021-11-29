<template>
  <div class="home container mt-4">

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
            <div class="col-3">
              <label for="checkDatetime" class="col-form-label" >Date de vérification</label>
            </div>
            <div class="col-5">
                <!-- <input type="datetime-local" id="checkDatetime" name="checkDatetime" v-model="checkDatetime"> -->
                <o-datetimepicker v-model="checkDatetime" 
                            placeholder="Click to select a date and a time" 
                            iconPack="fas" 
                            icon="calendar" 
                            :locale="'fr-FR'" 
                            :datepicker="{ showWeekNumber:false }" 
                            :timepicker="{ enableSeconds:false, hourFormat:'24' }" />
            </div>
          </div>

          <div class="row mb-2 g-3 align-items-center">
            <div class="col-3">
              <label for="is_rg" class="col-form-label">Sans identifiant</label>
            </div>
            <div class="col-5 form-check form-switch ps-2">
                  <!-- <input class="form-check-input" type="checkbox" id="is_rg"  v-model="is_rg"> -->
                  <o-switch :value="true" variant="danger" v-model="is_rg" />
            </div>
          </div>
          <div class="row mb-2 g-3 align-items-center">
            <div class="col-3" />
            <div class="col-5 buttons">
              <o-button variant="primary" v-on:click="search" iconPack="fas" icon-left="search"> Rechercher </o-button>
            </div>
          </div>
        </div>
    </div>

      <div class="card  mt-4">
        <div class="card-header">Résultat</div>
        <div class="card-body">
          <div class="row mb-2 g-3 justify-content-md-center">
            <div class="col-6 align-items-center">
              <o-notification variant="success" aria-close-label="Couverture">
                <div class="text-center h2">Information importante positive</div>
              </o-notification>
            </div>
          </div>
          <div class="row mb-2 g-3">
            <div class="col-2"></div>
            <div class="col-5">
                 <label>Identifiant en cours:</label> {{result.vuuid ||''}}
            </div>
          </div>

          <div class="row mb-2 g-3 align-items-center">
            <div class="col-12">

    <o-table
      :data="result ? result.coverages : []"
      :paginated="false"
      :per-page="perPage"
      :current-page="currentPage"
      :pagination-simple="false"
      :pagination-position="'bottom'"
      :default-sort-direction="'asc'"
      :sort-icon="'arrow-up'"
      :loading="status=='pending'"
      :narrowed="true"
      :striped="true"
      :iconPack="'fas'"
      :default-sort="'endDate'"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
      <o-table-column field="creationDate" label="Date" sortable position="centered" v-slot="props">
        {{ props.row.creationDate ? new Date(props.row.creationDate).toLocaleDateString(): ' ' }}
      </o-table-column>
      <o-table-column field="startDate" label="Start" sortable position="centered" v-slot="props">
        {{ props.row.startDate ? new Date(props.row.startDate).toLocaleDateString(): ' ' }}
      </o-table-column>
      <o-table-column field="endDate" label="End" sortable position="centered" v-slot="props">
        {{ props.row.endDate ? new Date(props.row.endDate).toLocaleDateString() : ' ' }}
      </o-table-column>
      <o-table-column field="insurance.name" label="Insurance" sortable v-slot="props">
        {{ props.row.insurance.name }}
      </o-table-column>

      <o-table-column field="vin" label="N° identifiant" sortable v-slot="props">
        {{ props.row.vin }}
      </o-table-column>
      <o-table-column field="vrn" label="N° matricule" sortable v-slot="props">
        {{ props.row.vrn }}
      </o-table-column>
      <o-table-column field="police" label="N° annexe" sortable v-slot="props">
        {{ props.row.police }}
      </o-table-column>
      <o-table-column field="version" label="Vers." sortable numeric v-slot="props">
        {{ props.row.version }}
      </o-table-column>

      <o-table-column label="" v-slot="props">
        <span>
          <o-icon clickable @click="print(props.row)" pack="fas" :icon="!props.row.endDate ? 'file-pdf' : 'print'"> </o-icon>
        </span>
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
    currentPage: 1,
    perPage: 25
  }),
  methods: {
    search(vin:string, vrn:string, checkDatetime:Date, is_rg:boolean){
      this.$store.dispatch('rcaSlice/search',{ vin, vrn, checkDatetime, is_rg })
    },
    print(item:any){
      this.$store.dispatch('rcaSlice/print',item)
    }
  },
  computed: {
    ...mapState( 'rcaSlice',  ['result','status'])
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