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
  borrowerEmail: {
    type: String,
    trim: true, //élimine les espaces avant et après l'email.
    lowercase: true,
    minlength: 6,
    maxlength: 254
  }
});

module.exports = Simulation;
