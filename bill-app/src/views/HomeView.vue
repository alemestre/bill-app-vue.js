<template>
  <div class="home">
    <!-- titre + bouton -->
    <div class="d-flex align-items-baseline justify-content-between mb-4">
      <h3 class="col-8 mb-4 text-secondary"><i class="fas fa-angle-down me-2" />Dashboard</h3>
      <div class="col-4 d-flex justify-content-between">
        <BButton
          size="sm"
          variant="outline-primary"
          iconLeft="circle-plus"
          :to="{ name: 'client', params: { id: -1 } }"
        >
          Ajouter un client
        </BButton>
        <BButton
          size="sm"
          variant="outline-primary"
          iconLeft="circle-plus"
          :to="{ name: 'bill', params: { id: -1 } }"
        >
          Ajouter une facture
        </BButton>
      </div>
    </div>
    <!-- ./titre + bouton -->
    <div class="row">
      <div class="col-4"></div>
      <div class="col-8">
        <div class="bill-table border-light shadow-sm rounded mt-2 mb-5 p-4">
          <h3>Factures en cours</h3>
          <p v-if="!lastFiveBills || !lastFiveBills.length" class="text-primary my-5">
            Aucune facture pour l'instant.
          </p>
          <!-- tableau des factures -->
          <DashboardBillList v-else>
            <DashboardBillListItem
              v-for="bill in lastFiveBills"
              :key="bill.id"
              :bill="bill"
              @delete="deleteBill($event)"
              @edit="editBill($event)"
            />
          </DashboardBillList>
        </div>
        <div class="client-table border-light shadow-sm rounded my-5 p-4">
          <h3>Client</h3>
          <p v-if="!lastFiveClients || !lastFiveClients.length" class="text-primary my-5">
            Aucun client pour l'instant.
          </p>
          <!-- ./tableau des clients -->
          <DashboardClientList v-else>
            <DashboardClientListItem
              v-for="client in lastFiveClients"
              :key="client.id"
              :client="client"
              @delete="deleteClient($event)"
              @edit="editClient($event)"
            />
          </DashboardClientList>
          <!-- ./tableau des clients -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardBillList from '@/components/bills/DashboardBillList.vue'
import DashboardBillListItem from '@/components/bills/DashboardBillListItem.vue'
import DashboardClientList from '@/components/clients/DashboardClientList.vue'
import DashboardClientListItem from '@/components/clients/DashboardClientListItem.vue'

import { useBillStore } from '../stores/bill'
import { useClientStore } from '../stores/client'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    DashboardBillList,
    DashboardBillListItem,
    DashboardClientList,
    DashboardClientListItem
  },
  computed: {
    // on matte le state.bills vers 'bills' dans le composant
    ...mapState(useBillStore, ['lastFiveBills']),
    ...mapState(useClientStore, ['lastFiveClients']),

    currentYear() {
      const date = new Date()
      return date.getFullYear()
    }
  },
  mounted() {
    //récupère la liste des 5 dernières bills depuis l'API et le store
    this.getLastFiveBills(),
      //récupère la liste des 5 derniers clients ajoutés depuis l'API et le store
      this.getLastFiveClients()
  },
  methods: {
    ...mapActions(useBillStore, ['getLastFiveBills']),
    ...mapActions(useClientStore, ['getLastFiveClients']),

    editBill(id) {
      console.log('edit bill' + id)
      this.$router.push({
        name: 'bill',
        params: { id }
      })
    },

    editClient(id) {
      console.log('edit client' + id)
      this.$router.push({
        name: 'client',
        params: { id }
      })
    }
  }
}
</script>
