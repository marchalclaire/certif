const express = require("express");
const router = express.Router();

//on importe nos modèles :
const Simulation = require("../models/Simulation");

//Route 1 - CREATE *************************************************** :
router.post("/simulation/create", async (req, res) => {
  try {
    let propertyType = req.fields.propertyType;
    let propertyCondition = req.fields.propertyCondition;
    let propertyUse = req.fields.propertyUse;
    let borrowerCurrentSituation = req.fields.borrowerCurrentSituation;
    let propertyCountry = req.fields.propertyCountry;
    let propertyCity = req.fields.propertyCity;
    let projectEstimatedAmount = req.fields.projectEstimatedAmount;
    let repairsEstimatedAmount = req.fields.repairsEstimatedAmount;
    let notaryCosts = req.fields.notaryCosts;
    let totalAmount = req.fields.totalAmount;
    let borrowerEmail = req.fields.borrowerEmail;

    //générer un numéro de dossier automatique
    let fileNumber = Math.floor(Math.random() * 100000000);

    const newSimulation = new Simulation({
      propertyType: propertyType,
      propertyCondition: propertyCondition,
      propertyUse: propertyUse,
      borrowerCurrentSituation: borrowerCurrentSituation,
      propertyCountry: propertyCountry,
      propertyCity: propertyCity,
      projectEstimatedAmount: projectEstimatedAmount,
      repairsEstimatedAmount: repairsEstimatedAmount,
      notaryCosts: notaryCosts,
      totalAmount: totalAmount,
      borrowerEmail: borrowerEmail,
      fileNumber: fileNumber
    });
    await newSimulation.save();

    //seul le numéro de dossier doit être retourné au Front (dernier écran)
    return res.json(fileNumber);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
});

//   dans postman : http://localhost:4000/simulation/create

module.exports = router;
