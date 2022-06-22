const userSchema = require('../models/user');


const userId = (req, res) => {
  const {id} = req.params;

  userSchema
  .findById(id)
  .then( (data) => res.json(data))
  .catch((err)=> res.json({message: err}))
}






module.exports = {
    userId
};