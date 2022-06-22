const interestsSchema = require("../models/interests")


const interestsGet = (req, res) =>{
    const {name} = req.query;

    if(name){
        interestsSchema
        .find({name:name})
        .then((data) => res.json(data))
        .catch(error => res. json({message: error,msj:"name"}))
    }
    else{
        interestsSchema
        .find()
        .then( data => res.json(data))
        .catch( error => res. json({message: error,msj:"else"}));

    }
}



module.exports = {
    interestsGet
}