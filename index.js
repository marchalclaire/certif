require("dotenv").config(); // Permet d'activer les variables d'environnement qui se trouvent dans le fichier `.env`
const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(formidableMiddleware());

//on importe nos models : ************************************************
require("./models/Simulation");

//on importe nos routes : ********************************************

const simulationRoutes = require("./routes/simulation");
app.use(simulationRoutes);

const backOfficeRoutes = require("./routes/backOffice");
app.use(backOfficeRoutes);

// on se connecte à la base de données : *******************************
// mongoose.connect("mongodb://localhost/certif", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connect(process.env.MONGODB_URI);

//on écoute les appels de l'extérieur sur le port 4001 : ********************************************
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});

//app.listen(process.env.PORT);
