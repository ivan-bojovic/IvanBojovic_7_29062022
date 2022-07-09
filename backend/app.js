// Importation express.
const express = require("express");

// Importation mongoose.
const mongoose = require("mongoose");

// DOTENV pour gérer les variables d'environnements.
require("dotenv").config();
// Importation helmet.
const helmet = require("helmet"); // Sécurisation des en-tete.
// CORS.
const cors = require("cors");
// Accès au chemin du système de fichier.
const path = require("path");

// Importation router post.
const postRoutes = require("./routes/post");

// Importation router user.
const userRoutes = require("./routes/user");

// Connexion à la base de données.
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.keo7e.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

//Securité OWASP.
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/posts", postRoutes);
app.use("/api/auth", userRoutes);

// Exportation du fichier APP.JS.
module.exports = app;
