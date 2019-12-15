const express = require("express");
const router = express.Router();

//on importe nos modèles :
const Simulation = require("../models/Simulation");

//Route 1 - CREATE *************************************************** :
router.post("/simulation/create", async (req, res) => {
  try {
    let typeDeBien = req.fields.typeDeBien;
    let etatDuBien = req.fields.etatDuBien;
    let usageDuBien = req.fields.usageDuBien;
    let votreSituationActuelle = req.fields.votreSituationActuelle;
    let paysDuBien = req.fields.paysDuBien;
    let villeDuBien = req.fields.villeDuBien;
    let montantEstimeProjet = req.fields.montantEstimeProjet; //pour le moment en dur mais sera ensuite un calcul
    let emailEmprunteur = req.fields.emailEmprunteur;

    const newSimulation = new Simulation({
      typeDeBien: typeDeBien,
      etatDuBien: etatDuBien,
      usageDuBien: usageDuBien,
      votreSituationActuelle: votreSituationActuelle,
      paysDuBien: paysDuBien,
      villeDuBien: villeDuBien,
      montantEstimeProjet: montantEstimeProjet,
      emailEmprunteur: emailEmprunteur
    });
    await newSimulation.save();
    return res.json(newSimulation);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
});

//   dans postman : http://localhost:4000/simulation/create

module.exports = router;
