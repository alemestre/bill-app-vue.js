require('dotenv').config()
const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose=require('mongoose')

const port = process.env.PORT
const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const cluster = process.env.MONGO_CLUSTER
const db = process.env.MONGO_DB

//import des routes
const billsRoutes= require('./routes/bills')
const clientsRoutes= require('./routes/clients')


const app = express()

// Connexion à la base de données MongoDB Atlas
mongoose.connect(`mongodb+srv://${mongo_username}:${mongo_password}@${cluster}/${db}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connexion à la base de données MongoDB Atlas réussie');
})
.catch((err) => {
  console.error('Erreur de connexion à la base de données MongoDB Atlas', err);
});



// permet de transformer le body de la requête en json automatiquement
app.use(express.json())

// attention, l'ordre est important
// d'abord on vérifie la sécurité avec cors
app.use(cors({
  origin: 'http://localhost:5173'
}))



// on configure les routes

app.use('/bills', billsRoutes)
app.use('/clients', clientsRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})