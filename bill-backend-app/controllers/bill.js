const Bill = require('../models/Bill')

//get the items list
const getItems = (req, res) => {

    Bill.find()
    .then((bills) => {
    
       res.status(200).json(bills);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
}

//get the last five invoices
const getLastFiveItems = (req, res) => {

  Bill.find().sort({date: 'desc'}).limit(5)
  .then((bills) => {
  
     res.status(200).json(bills);
  })
  .catch((error) => {
    res.status(500).send({ error });
  });
}


//get one item
const getItem = (req, res) => {
    const id = req.params.id;

    Bill.findById(id)
    .then((bill) => {
      if (!bill) {
        return res
          .status(404)
          .send({ error: `La facture avec l'${id} n'existe pas` });
      }
       res.status(200).json(bill);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
}


// modifie un élément unique, correspond à la route PATCH /bills/:id
const patchItem = (req, res)=> {
    const id = req.params.id
    const updatedBill = req.body
    // trouve une facture et patch 
    Bill.updateOne({
      _id: id
    }, {
      ...updatedBill
    }).then((bill)=>{
      //on renvoie les résultats sous la forme de JSON
      res.status(201).json(bill)
      //si erreur...
    }).catch(error => res.status(400).json({ error : error.message }))
  }
  

//create one item
const postItem = (req, res) => {
    const newBill = req.body
    const bill = new Bill({...newBill})
    bill.save().then((b) => {
        res.status(201).json(b)

    }).catch((e) =>  {
        res.status(400).json({e})
    })

}

//delete one item
const deleteItem = (req, res) => {
    const id = req.params.id;
    Bill.deleteOne({_id:id})
    .then((bill) => {
    if (!bill) {
      return res
        .status(404)
        .send({ error: `La facture avec l'id ${id} n'\existe pas ` });
    }
    res.send({ message: "La facture a bien été supprimée" });
  })
  .catch((e) =>  {
    res.status(400).json({message: e.message})
});
}


module.exports = { getItems, getLastFiveItems, getItem, patchItem, postItem, deleteItem }