const express = require("express");
const mailgun = require("mailgun-js");
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
    let propertyEstimatedAmount = req.fields.propertyEstimatedAmount;
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
      propertyEstimatedAmount: propertyEstimatedAmount,
      repairsEstimatedAmount: repairsEstimatedAmount,
      notaryCosts: notaryCosts,
      totalAmount: totalAmount,
      borrowerEmail: borrowerEmail,
      fileNumber: fileNumber
    });
    await newSimulation.save();

    //gestion de l'envoi du mail
    const API_KEY = "key-0e0307189be7ed0249cbb73e7909f8cf";
    const DOMAIN = "mg.lereacteur.io";
    const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

    let body =
      "Bonjour, \n \n Voici le résumé de votre simulation d'emprunt sur Meilleurtaux.com : \n \n";
    body = body + "Numéro de dossier: " + fileNumber + "\n";
    body = body + "Type de bien: " + propertyType + "\n";
    body = body + "Etat du bien: " + propertyCondition + "\n";
    body = body + "Usage du bien: " + propertyUse + "\n";
    body =
      body + "Votre situation actuelle: " + borrowerCurrentSituation + "\n";
    body = body + "Pays du bien à financer: " + propertyCountry + "\n";
    body = body + "Ville du bien à financer: " + propertyCity + "\n";
    body =
      body +
      "Montant estimé de votre acquisition: " +
      propertyEstimatedAmount +
      " €\n";
    if (repairsEstimatedAmount) {
      body =
        body + "Montant estimé des travaux: " + repairsEstimatedAmount + " €\n";
    }

    body = body + "Frais de notaire: " + notaryCosts + " €\n";
    body = body + "Budget total estimé du projet: " + totalAmount + " €\n\n";
    body = body + "Merci de votre confiance \n\n L'équipe Meilleurtaux.com";

    const data = {
      from: "Certif Claire Marchal <postmaster@" + DOMAIN + ">",
      to: borrowerEmail,
      subject: "Résumé de votre simulation",
      text: body
    };
    mg.messages().send(data, function(error, body) {
      if (body) {
        console.log(body);
      }
      if (error) {
        console.log(error);
      }
    });

    //seul le numéro de dossier doit être retourné au Front (dernier écran)
    return res.json(fileNumber);
  } catch (error) {
    console.log(error.message);
    res.json({ message: error.message });
  }
});

module.exports = router;
