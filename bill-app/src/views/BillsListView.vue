<template>
  <div class="home">
    <!-- titre + bouton -->
    <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
      <h2 class="mb-4 text-secondary"><i class="fas fa-angle-down me-2" />Liste des factures</h2>
      <BButton size="sm" iconLeft="circle-plus" :to="{ name: 'bill', params: { id: -1 } }">
        Ajouter une facture
      </BButton>
    </div>
    <!-- ./titre + bouton -->

    <p v-if="!bills || !bills.length" class="text-primary my-5">Aucune facture pour l'instant.</p>
    <!-- tableau des factures -->
    <BillList v-else>
      <BillListItem
        v-for="bill in bills"
        :key="bill.id"
        :bill="bill"
        @delete="deleteBill($event)"
        @edit="editBill($event)"
      />
    </BillList>
    <!-- ./tableau des factures -->
  </div>
  <p class="text-center text-muted">{{ totalBills }} facture<span v-if="totalBills > 1">s</span></p>
</template>
<script>
import BillList from '@/components/bills/BillList.vue'
import BillListItem from '@/components/bills/BillListItem.vue'
import { useBillStore } from '../stores/bill'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    BillList,
    BillListItem
  },
  computed: {
    // on matte le state.bills vers 'bills' dans le composant
    ...mapState(useBillStore, ['bills', 'totalBills']),

    currentYear() {
      const date = new Date()
      return date.getFullYear()
    }
  },
  mounted() {
    //récupère la liste des bills depuis l'API et le store
    this.getBills()
  },
  methods: {
    ...mapActions(useBillStore, ['deleteBill', 'getBills']),
    editBill(id) {
      console.log('edit' + id)
      this.$router.push({
        name: 'bill',
        params: { id }
      })
    }
  }
}
</script>
