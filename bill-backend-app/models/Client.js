const mongoose = require('mongoose')

const { Schema } = mongoose

const ClientSchema = new Schema ({

    firstName: {
        type: String,
        required : true 
    },
    lastName: {
        type: String,
        required : true 
    },
    jobTitle: {
        type: String,
        required : true 
    },
    companyName: {
        type: String,
        required : true 
    },
    phone: String,
    email: String,
    address: {
        type: String,
        required : true 
    },
    optionalAddress: String,
    postalCode: {
        type: String,
        required : true 
    },
    city: {
        type: String,
        required : true 
    },
    country:{
        type: String,
        required : true 
    },
    createdDate: {
        type: String,
        required : true 
    },
    
})

module.exports = mongoose.model('Client', ClientSchema)