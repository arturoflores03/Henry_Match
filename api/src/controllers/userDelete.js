const userSchema = require("../models/user");

const userDelete = (req, res) =>{
    const { id } = req.params;
    userSchema
        .remove({_id: id})
        .then( data => res.json(data))
        .catch(error => res.json({message: error}))
}

module.exports = {
    userDelete
};