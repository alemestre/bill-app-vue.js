const Client = require('../models/Client')

//récupère la liste des clients
const getClients = (req, res) => {

    Client.find()
    .then((clients) => {
    
       res.status(200).json(clients);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
}

//get the last five added clients
const getLastFiveClients = (req, res) => {

  Client.find().sort({date: 'desc'}).limit(5)
  .then((bills) => {
  
     res.status(200).json(bills);
  })
  .catch((error) => {
    res.status(500).send({ error });
  });
}

//récupère un seul client avec l'id
const getClient = (req, res) => {
    const id = req.params.id;

    Client.findById(id)
    .then((client) => {
      if (!client) {
        return res
          .status(404)
          .send({ error: `Le client avec l'${id} n'existe pas` });
      }
       res.status(200).json(client);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
}


// modifie un élément unique, correspond à la route PATCH /clients/:id
const patchClient = (req, res)=> {
    const id = req.params.id
    const updatedClient = req.body
    // trouve un client et patch 
    Client.updateOne({
      _id: id
    }, {
      ...updatedClient
    }).then((client)=>{
      //on renvoie les résultats sous la forme de JSON
      res.status(201).json(client)
      //si erreur...
    }).catch(error => res.status(400).json({ error }))
  }
  

//crée un client
const postClient = (req, res) => {
    const newClient = req.body
    const client = new Client({...newClient})
    client.save().then((b) => {
        res.status(201).json(b)

    }).catch((e) =>  {
        res.status(400).json({e})
    })

}

//delete one client
const deleteClient = (req, res) => {
    const id = req.params.id;
    Client.deleteOne({_id:id})
    .then((client) => {
    if (!client) {
      return res
        .status(404)
        .send({ error: `Le client avec l'id ${id} n'\existe pas ` });
    }
    res.send({ message: "Le client a bien été supprimé" });
  })
  .catch((e) =>  {
    res.status(400).json({message: e.message})
});
}


module.exports = { getClients,getLastFiveClients, getClient, patchClient, postClient, deleteClient }