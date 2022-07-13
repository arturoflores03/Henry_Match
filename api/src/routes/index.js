const express = require("express");
//const cors = require("cors");
const router = express.Router();
//STRIPE
const Stripe = require("stripe");
require("dotenv").config();
const { API_STRIPE } = process.env;
const stripe = new Stripe(API_STRIPE);
/* app.use(
  cors({
    origin: ["http://localhost:9000", "https://checkout.stripe.com"],
  })
); */
const { userDelete } = require("../controllers/userDelete");
const { userGet } = require("../controllers/userGet");
const { userPost } = require("../controllers/userPost");
const { userPut } = require("../controllers/userPut");
const { interestsPost } = require("../controllers/interestPost");
const { interestsGet } = require("../controllers/interestsGet");
const { userId } = require("../controllers/userId");
const { interestsPut } = require("../controllers/interestsPut");
const { interestsId } = require("../controllers/interestsId");
const { interestsDelete } = require("../controllers/interestsDelete");
const { userNickname } = require("../controllers/userNickname");

router.get("/users/:nickname", userNickname);
router.get("/users", userGet);
router.post("/users", userPost);
router.put("/usersId/:id", userPut);
router.get("/usersId/:id", userId);
router.delete("/usersId/:id", userDelete);
router.post("/interests", interestsPost);
router.get("/interests", interestsGet);
router.put("/interests/:id", interestsPut);
router.get("/interests/:id", interestsId);
router.delete("/interests/:id", interestsDelete);

//RUTA STRIPE
router.post("/subscription", async (req, res) => {
  try {
    const { id, amount } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      /*    transfer_data: {
        amount: amount * 0.1,
        destination: "ch_3LJf95J7NqOhO9cb0l0P5J6b",
      }, */
      currency: "USD",
      description: "Henry Match subscription",
      payment_method: id,
      //transfer_group: "SUBSCRIPTIONS",
      confirm: true,
    });
    return res.status(200).send({ message: "ok" }); //.json({ url: payment.url })
  } catch (e) {
    res.json({ message: e.raw.message });
  }
});

module.exports = router;
