import prestationInterface from './prestation.interface'

const date = new Date().toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
})

export default {
  billnum: 0,
  description: '',
  date: date,
  client: {},
  prestations: [
    {
      ...prestationInterface
    }
  ],
  discount: 0.0,
  paid: 0.0,
  totalHT: 0,
  tva: 20,
  totalTTC: 0
}
