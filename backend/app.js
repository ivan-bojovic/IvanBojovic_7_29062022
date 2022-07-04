// Importation express.
const express = require('express');

// Importation mongoose.
const mongoose = require('mongoose');

// DOTENV pour gérer les variables d'environnements.
require('dotenv').config();

const path = require("path");

// Importation router post.
const postRoutes = require('./routes/post');

// Importation router user.
const userRoutes = require('./routes/user')

// Connexion à la base de données.
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.keo7e.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use (express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);



// Exportation du fichier APP.JS.
module.exports = app;