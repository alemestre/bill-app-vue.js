import { defineStore } from 'pinia'
import billInterface from '@/interface/bill.interface.js'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'

const useBillStore = defineStore('bill', {
  state: () => {
    return {
      bill: null,
      bills: [],
      lastFiveBills: []
    }
  },
  getters: {
    totalBills: (state) => state.bills.length
  },
  actions: {
    //Récupérer toutes les factures
    async getBills() {
      try {
        const response = await axios.get('/bills')
        console.log(response.data)
        this.$patch({ bills: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    // Récupère les cinq dernières factures
    async getLastFiveBills() {
      console.log('je récupère les 5 dernières factures')
      try {
        const response = await axios.get('/bills/limit')
        console.log(response.data)
        this.$patch({ lastFiveBills: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    // méthode pour supprimer une facture du tableau bills
    async deleteBill(id) {
      try {
        const response = await axios.delete(`/bills/${id}`)
        console.log(response.data)
        this.getBills()
      } catch (error) {
        console.log(error)
      }
    },
    createBill() {
      // console.log("création d'une nouvelle facture")
      // on place une nouvelle facture dans le store bill

      this.$patch({ bill: cloneDeep(billInterface) })
    },

    //éditer une facture existante à partir de son id
    async getBill(id) {
      try {
        const response = await axios.get(`/bills/${id}`)
        console.log(response.data)
        this.$patch({ bill: cloneDeep(response.data) })
      } catch (error) {
        console.log(error)
      }
    },

    //enregistrer les modifications d'une facture (nouvelle / en édition)
    async saveBill(bill) {
      if (bill._id) {
        try {
          const response = await axios.patch(`/bills/${bill._id}`, bill)
          console.log("update d'une facture", response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const response = await axios.post(`/bills`, bill)
          console.log("création d'une facture", response.data)
          this.$reset()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})

export { useBillStore }
