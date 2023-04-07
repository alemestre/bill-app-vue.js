<template>
  <div class="client d-flex justify-content-center">
    <div class="col-xl-11">
      <section v-if="client">
        <div class="d-flex align-items-baseline justify-content-between border-bottom mb-4">
          <h1>
            {{ isNewClient ? 'Créer un nouveau ' : 'Editer le' }} client
            <span v-if="!isNewClient" class="text-primary h3">#{{ id }}</span>
          </h1>
          <div class="d-flex gap-2">
            <BButton
              v-if="!isNewClient"
              size="sm"
              variant="outline-danger"
              @click="onDeleteClient"
              icon-left="trash"
              >Supprimer</BButton
            >
            <BButton to="/" size="sm" variant="outline-primary" icon-left="angle-left"
              >Annuler</BButton
            >
          </div>
        </div>
        <div class="form row">
          <div class="first-colum-form col-10">
            <div class="row">
              <h4 class="text-secondary mb-3">Contact:</h4>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="firstName" class="col-4 col-form-label">Prénom:</label>
                  <div class="col-sm-8 col-8">
                    <input v-model="client.firstName" class="form-control" id="clientFirstName" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="lastName" class="col-sm-3 col-4 col-form-label">Nom:</label>
                  <div class="col-sm-9 col-9">
                    <input v-model="client.lastName" class="form-control" id="lastName" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="jobTitle" class="col-4 col-form-label">Fonction:</label>
                  <div class="col-sm-8 col-8">
                    <input v-model="client.jobTitle" class="form-control" id="clientJobTitle" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="phone" class="col-sm-3 col-4 col-form-label">Téléphone:</label>
                  <div class="col-sm-9 col-9">
                    <input v-model="client.phone" class="form-control" id="phone" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row mb-3">
                  <label for="email" class="col-sm-2 col-2 col-form-label">Email:</label>
                  <div class="col-sm-10">
                    <input v-model="client.email" class="form-control" id="email" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row mb-3">
                  <label for="companyName" class="col-sm-2 col-2 col-form-label">Entreprise:</label>
                  <div class="col-sm-10">
                    <input v-model="client.companyName" class="form-control" id="companyName" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row my-3">
              <h4 class="text-secondary">Coordonnées:</h4>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row mb-3">
                  <label for="address" class="col-sm-2 col-2 col-form-label">Adresse 1:</label>
                  <div class="col-sm-10">
                    <input v-model="client.address" class="form-control" id="address" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row mb-3">
                  <label for="optionalAddress" class="col-sm-2 col-2 col-form-label"
                    >Adresse 2:</label
                  >
                  <div class="col-sm-10">
                    <input
                      v-model="client.optionalAddress"
                      class="form-control"
                      id="optionalAddress"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="postalCode" class="col-4 col-form-label">Code Postal:</label>
                  <div class="col-sm-8 col-8">
                    <input v-model="client.postalCode" class="form-control" id="clientPostalCode" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="city" class="col-sm-3 col-4 col-form-label">Ville:</label>
                  <div class="col-sm-9 col-9">
                    <input v-model="client.city" class="form-control" id="city" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="country" class="col-4 col-form-label">Pays:</label>
                  <div class="col-sm-8">
                    <select
                      class="form-select"
                      :arialabel="client.country ? client.country : 'Choisir'"
                      v-model="client.country"
                      id="country"
                    >
                      <option>Choisir</option>
                      <option
                        v-for="option in countryOptions"
                        :key="option.id"
                        :value="option.label"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="second-colum-form col-2">
            <label for="createdDate" class="mb-1 col-form-label">Date d'ajout:</label>
            <div>
              <input v-model="client.createdDate" class="form-control" id="clientCreatedDate" />
            </div>
          </div>
        </div>
        <div class="col text-end">
          <BButton
            variant="outline-secondary"
            @click="onSaveClient()"
            iconRight="fas fa-floppy-disk"
          >
            {{ isNewClient ? 'Enregistrer' : 'Modifier' }}
          </BButton>
        </div>
      </section>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="form-check my-3">
        <input class="form-check-input" type="checkbox" v-model="debug" id="debug" />
        <label class="form-check-label" for="debug"> Debug </label>
      </div>
    </div>
  </div>
  <pre class="card p-2" v-if="debug">
      {{ client }}
    </pre
  >
</template>

<script>
import { countryOptions } from '../libs/countryOptions'
import { useClientStore } from '../stores/client.js'
import { mapState, mapActions } from 'pinia'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      debug: false,
      countryOptions: countryOptions
    }
  },
  computed: {
    ...mapState(useClientStore, ['client']),
    // est-ce une nouvelle client ? ou est-on en train de modifier une client enregistrée ?
    isNewClient() {
      return !this.id || this.id < 0
    }
  },
  mounted() {
    // console.log(this.$route.params.id)
    console.log(this.id)

    //au chargement du composant, en fonction de l'id passé dans la route, sous forme de props
    if (this.isNewClient) {
      //soit je crée un nouveau formulaire (venant du store)
      this.createClient()
    } else {
      // soit je remplis le formulaire avec les données de la client à modifier
      this.getClient(this.id)
    }
  },
  methods: {
    // on importe les méthodes du store client
    ...mapActions(useClientStore, ['createClient', 'getClient', 'saveClient', 'deleteClient']),

    // on supprime un client utilisant la méthode deleteClient déclarée dans le client store
    onDeleteClient() {
      this.deleteClient(this.id)
      this.$router.push('/clients')
    },

    // on sauvegarde un client utilisant la méthode saveClient déclarée dans le client store
    async onSaveClient() {
      await this.saveClient({
        ...this.client,
        totalHT: this.totalHT,
        totalTTC: this.totalTTC
      })
      this.$router.push('/clients')
    }
  }
}
</script>
