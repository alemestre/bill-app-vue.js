const date = new Date().toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric'
})

export default {
  firstName: '',
  lastName: '',
  jobTitle: '',
  companyName: '',
  phone: '',
  email: '',
  address: '',
  optionalAddress: '',
  postalCode: '',
  city: '',
  country: '',
  createdDate: date
}
