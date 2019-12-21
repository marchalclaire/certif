const mongoose = require("mongoose");

const Simulation = mongoose.model("Simulation", {
  fileNumber: String,
  propertyType: String,
  propertyCondition: String,
  propertyUse: String,
  borrowerCurrentSituation: String,
  propertyCountry: String,
  propertyCity: String,
  projectEstimatedAmount: Number,
  repairsEstimatedAmount: Number,
  notaryCosts: Number,
  totalAmount: Number,
  borrowerEmail: String
});

module.exports = Simulation;
