import { defineStore } from 'pinia'
import clientInterface from '@/interface/client.interface.js'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'

const useClientStore = defineStore('client', {
  state: () => {
    return {
      client: null,
      clients: [],
      lastFiveClients: []
    }
  },
  getters: {
    totalClients: (state) => state.clients.length
  },
  actions: {
    //Récupérer tous les clients
    async getClients() {
      try {
        const response = await axios.get('/clients')
        console.log('on récupère tous les clients', response.data)
        this.$patch({ clients: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    // Récupère les cinq dernières clients ajoutés
    async getLastFiveClients() {
      console.log('je récupère les 5 derniers clients')
      try {
        const response = await axios.get('/clients/limit')
        console.log(response.data)
        this.$patch({ lastFiveClients: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    // méthode pour supprimer un client du tableau clients
    async deleteClient(id) {
      try {
        const response = await axios.delete(`/clients/${id}`)
        console.log(response.data)
        this.getClients()
      } catch (error) {
        console.log(error)
      }
    },
    createClient() {
      // console.log("création d'un nouveau client")
      // on place un nouveau client dans le store client

      this.$patch({ client: cloneDeep(clientInterface) })
    },

    //éditer un client existante à partir de son id
    async getClient(id) {
      try {
        const response = await axios.get(`/clients/${id}`)
        console.log(response.data)
        this.$patch({ client: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    //enregistrer les modifications d'un client (nouveau / en édition)
    async saveClient(client) {
      if (client._id) {
        try {
          const response = await axios.patch(`/clients/${client._id}`, client)
          console.log("update d'un client", response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const response = await axios.post(`/clients`, client)
          console.log("création d'un client", response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})

export { useClientStore }
