const mongoose = require ('mongoose')

const interestsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Interests', interestsSchema)