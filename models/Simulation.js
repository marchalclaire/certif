const mongoose = require("mongoose");

const Simulation = mongoose.model("Simulation", {
  fileNumber: String,
  propertyType: String,
  propertyCondition: String,
  propertyUse: String,
  borrowerCurrentSituation: String,
  propertyCountry: String,
  propertyCity: String,
  propertyEstimatedAmount: Number,
  repairsEstimatedAmount: Number,
  notaryCosts: Number,
  totalAmount: Number,
  borrowerEmail: {
    type: String,
    trim: true,
    lowercase: true
  }
});

module.exports = Simulation;
