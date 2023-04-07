<template>
  <div class="home">
    <!-- titre + bouton -->
    <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
      <h2 class="mb-4 text-secondary"><i class="fas fa-angle-down me-2" />Liste des clients</h2>
      <BButton size="sm" iconLeft="circle-plus" :to="{ name: 'client', params: { id: -1 } }">
        Ajouter un client
      </BButton>
    </div>
    <!-- ./titre + bouton -->

    <p v-if="!clients || !clients.length" class="text-primary my-5">Aucun client pour l'instant.</p>
    <!-- tableau des clients -->
    <ClientList v-else>
      <ClientListItem
        v-for="client in clients"
        :key="client.id"
        :client="client"
        @delete="deleteClient($event)"
        @edit="editClient($event)"
      />
    </ClientList>
    <!-- ./tableau des clients -->
  </div>
  <p class="text-center text-muted">
    {{ totalClients }} client<span v-if="totalClients > 1">s</span>
  </p>
</template>
<script>
import ClientList from '@/components/clients/ClientList.vue'
import ClientListItem from '@/components/clients/ClientListItem.vue'
import { useClientStore } from '../stores/client'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    ClientList,
    ClientListItem
  },
  computed: {
    // on matte le state.clients vers 'clients' dans le composant
    ...mapState(useClientStore, ['clients', 'totalClients']),

    currentYear() {
      const date = new Date()
      return date.getFullYear()
    }
  },
  beforeMount() {
    //récupère la liste des clients depuis l'API et le store
    this.getClients()
  },
  methods: {
    ...mapActions(useClientStore, ['deleteClient', 'getClients']),
    editClient(id) {
      console.log('edit' + id)
      this.$router.push({
        name: 'client',
        params: { id }
      })
    }
  }
}
</script>
