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

//Route 2 - DONNEES *************************************************** :
router.get("/backoffice/data", async (req, res) => {
  try {
    //récupération de toutes les simulations déjà existantes
    const simulations = await Simulation.find();

    return res.json(simulations);
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
});

//Route 3 - DELETE *************************************************** :
router.post("/backoffice/delete", async (req, res) => {
  try {
    let id = req.fields.id;

    let simulationToDelete = await Simulation.findById(id);

    if (simulationToDelete) {
      // suppression de la simulation
      simulationToDelete.remove();
    }

    return res.json("ok");
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
});

module.exports = router;
