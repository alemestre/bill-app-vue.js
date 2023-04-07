const mongoose = require('mongoose')

const { Schema } = mongoose

const BillSchema = new Schema ({
    billnum: {
        type: String,
        required : true 
    },
    date: {
        type: String,
        required : true 
    },
    description: {
        type: String,
    },
    client: {
        type: Object,
        required : true 
    },
    prestations: Array,
    discount: Number,
    paid: Number,
    totalHT: Number,
    tva: Number,
    totalTTC: Number
})

module.exports = mongoose.model('Bill', BillSchema)