const express = require("express");
const router = express.Router();

//on importe nos modèles :
const Simulation = require("../models/Simulation");

//Route 1 - PASSWORD *************************************************** :
router.post("/backoffice/login", async (req, res) => {
  try {
    let password = req.fields.password;

    let message = "";
    if (password === "tothemoon") {
      message = "ok";
    } else {
      message = "mot de passe inconnu";
    }

    return res.json({ message: message });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
});

//   dans postman : http://localhost:4001/backoffice/login

module.exports = router;
