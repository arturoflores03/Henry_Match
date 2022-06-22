const interestsSchema = require('../models/interests');


const interestsPost = (req, res) => {
    const user = interestsSchema(req.body);

    user.save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }))
}


module.exports = {
    interestsPost
};