const mongoose = require("mongoose");

const Simulation = mongoose.model("Simulation", {
  typeDeBien: String,
  etatDuBien: String,
  usageDuBien: String,
  votreSituationActuelle: String,
  paysDuBien: String,
  villeDuBien: String,
  montantEstimeProjet: Number,
  emailEmprunteur: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: 6,
    maxlength: 254
  }
});

module.exports = Simulation;
