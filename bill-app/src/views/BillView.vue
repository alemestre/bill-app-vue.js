<template>
  <div class="bill">
    <section v-if="bill">
      <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
        <h1>
          {{ isNewBill ? 'Créer une nouvelle ' : 'Modifier la' }} facture
          <span v-if="!isNewBill" class="text-primary h4">#{{ id }}</span>
        </h1>
        <div class="d-flex gap-2">
          <BButton
            v-if="!isNewBill"
            size="sm"
            variant="outline-danger"
            @click="onDeleteBill"
            icon-left="trash"
            >Supprimer</BButton
          >
          <BButton to="/" size="sm" variant="outline-primary" iconLeft="angle-left"
            >Annuler</BButton
          >
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-lg-5">
          <div class="mb-3 row">
            <label for="billnum" class="col-sm-4 col-form-label">Facture N°</label>
            <div class="col-sm-8">
              <input v-model="bill.billnum" type="text" class="form-control" id="billnum" />
            </div>
          </div>
        </div>
        <div class="col-md-12 col-lg-7">
          <div class="mb-3 row">
            <label for="description" class="col-sm-4 col-form-label">Description</label>
            <div class="col-sm-8">
              <input v-model="bill.description" type="text" class="form-control" id="description" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-5">
          <div class="mb-3 row">
            <label for="date" class="col-sm-4 col-form-label">Émise le:</label>
            <div class="col-sm-8">
              <input v-model="bill.date" type="text" class="form-control" id="date" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-lg-5">
          <div class="mb-3 row">
            <label for="client" class="col-sm-4 col-form-label">Client :</label>
            <div class="col-sm-8">
              <select
                class="form-select"
                :arialabel="bill.client.firstName + ' ' + bill.client.lastName"
                v-model="bill.client"
                id="client"
              >
                <option>Choisir</option>
                <option v-for="client in clients" :key="client._id" :value="client">
                  {{ client.firstName }} {{ client.lastName }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">Actions</th>
            <th scope="col">Prestation</th>
            <th scope="col">Quantité</th>
            <th scope="col" class="text-end">Montant U.</th>
            <th scope="col" class="text-end">Montant Total</th>
          </tr>
        </thead>
        <tbody>
          <!-- prestations -->
          <tr v-for="(prestation, index) in bill.prestations" :key="'prestation-' + index">
            <td>
              <div class="d-flex justify-content-end pe-4">
                <BButton
                  v-if="index == bill.prestations.length - 1"
                  class="pe-0"
                  @click="onAddPrestation(index)"
                  icon-left="circle-plus"
                  variant="white text-success border-0"
                  ><span class="sr-only">Ajouter</span></BButton
                >
                <BButton
                  :disabled="bill.prestations.length == 1"
                  @click="onDeletePrestation(index)"
                  class="pe-0"
                  icon-left="trash"
                  variant="white text-danger border-0"
                  ><span class="sr-only">Supprimer</span></BButton
                >
              </div>
            </td>
            <td>
              <input v-model="prestation.description" class="form-control" />
            </td>
            <td>
              <input min="1" type="number" v-model="prestation.qty" class="form-control" />
            </td>
            <td><input v-model="prestation.price" class="form-control text-end" /></td>
            <td>
              <input
                :value="prestation.qty * prestation.price"
                disabled
                class="form-control text-end"
              />
            </td>
          </tr>
          <!-- ./prestations -->
          <!-- totaux -->
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="discount" class="form-label pt-1">Remises</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                class="form-control text-end"
                type="number"
                v-model.number="bill.discount"
                id="discount"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="totalHT" class="form-label pt-1">Total HT</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                disabled
                class="form-control text-end"
                :value="totalHT"
                type="number"
                id="totalHT"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="totalTVA" class="form-label pt-1">TVA ({{ bill.tva }}%)</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                disabled
                class="form-control text-end"
                type="number"
                id="totalTVA"
                :value="totalTVA"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="totalTTC" class="form-label pt-1">Montant total TTC</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                disabled
                class="form-control text-end"
                type="number"
                id="totalTTC"
                :value="totalTTC"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 pt-3 pb-1">
              <label for="paid" class="form-label pt-1">Acompte déjà payé</label>
            </td>
            <td class="text-end border-0 pt-3 pb-1">
              <input
                class="form-control text-end"
                type="number"
                v-model.number="bill.paid"
                id="paid"
              />
            </td>
          </tr>
          <tr>
            <td colspan="4" class="text-end border-0 py-1">
              <label for="totalRestDue" class="form-label pt-1">Reste Dû TTC</label>
            </td>
            <td class="text-end border-0 py-1">
              <input
                disabled
                class="form-control text-end bg-secondary-subtle fw-bold"
                readonly
                type="number"
                id="totalRestDue"
                :value="totalRest"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <div class="row">
      <div class="col">
        <div class="form-check my-3">
          <input class="form-check-input" type="checkbox" v-model="debug" id="debug" />
          <label class="form-check-label" for="debug"> Debug </label>
        </div>
      </div>
      <div class="col text-end">
        <BButton variant="outline-secondary" @click="onSaveBill()" iconRight="fas fa-floppy-disk">
          {{ isNewBill ? 'Enregistrer' : 'Modifier' }}
        </BButton>
      </div>
    </div>
    <pre class="card p-2" v-if="debug">
      {{ bill }}
    </pre>
  </div>
</template>

<script>
import prestationInterface from '../interface/prestation.interface.js'
import { useBillStore } from '../stores/bill'
import { useClientStore } from '../stores/client'
import { mapState, mapActions } from 'pinia'
import BButton from '../components/BButton.vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      debug: false
    }
  },
  computed: {
    ...mapState(useBillStore, ['bill']),
    ...mapState(useClientStore, ['clients']),
    // est-ce une nouvelle facture ? ou est-on en train de modifier une facture enregistrée ?
    isNewBill() {
      return !this.id || this.id < 0
    },
    totalHT() {
      let total = 0
      if (this.bill.prestations && this.bill.prestations.length) {
        this.bill.prestations.forEach((prestation) => {
          total += prestation.qty * prestation.price
        })
      }
      total -= this.bill.discount
      return total
    },
    totalTVA() {
      return (this.totalHT * this.bill.tva) / 100
    },
    totalTTC() {
      return this.totalHT + this.totalTVA
    },
    totalRest() {
      return this.totalTTC - this.bill.paid
    }
  },
  mounted() {
    //on récupère la liste des clients depuis l'API et le store à afficher dans l'input
    this.getClients()
    //au chargement du composant, en fonction de l'id passé dans la route, sous forme de props
    if (this.isNewBill) {
      //soit je crée un nouveau formulaire (venant du store)
      this.createBill()
    } else {
      // soit je remplis le formulaire avec les données de la bill à modifier
      this.getBill(this.id)
    }
  },
  methods: {
    // on importe les méthodes du store bill
    ...mapActions(useBillStore, ['createBill', 'getBill', 'saveBill', 'deleteBill']),

    // on importe la méthode getclients du store
    ...mapActions(useClientStore, ['getClients']),

    // pousse une nouvelle prestation dans le tableau bill.prestations
    onAddPrestation() {
      this.bill.prestations.push({
        ...prestationInterface,
        description: 'description par défaut' // on peut modifier les valeurs à la volée
      })
    },
    // supprime une prestation dans le tableau bill.prestations en fonction
    // de son index dans le tableau
    onDeletePrestation(index) {
      this.bill.prestations.splice(index, 1)
    },
    onDeleteBill() {
      this.deleteBill(this.id)
      this.$router.push('/bills')
    },
    async onSaveBill() {
      console.log(this.bill)
      await this.saveBill({
        ...this.bill,
        totalHT: this.totalHT,
        totalTTC: this.totalTTC
      })
      this.$router.push('/bills')
    }
  },
  components: { BButton }
}
</script>
