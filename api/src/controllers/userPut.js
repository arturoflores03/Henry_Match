const userSchema = require("../models/user");


const userPut = (req, res) =>{
    const {id} = req.params;
    const {name, age ,birthday, nickname, email, password, image, description, henryLevel} = req.body
    userSchema
        .updateOne({_id:id},{ $set: {name, age, birthday, nickname, email, password, image, genderInt, gender, description, henryLevel}})
        .then(data => res.json(data))
        .catch((error) => res.json({message:error}));
}

module.exports = {
    userPut
};