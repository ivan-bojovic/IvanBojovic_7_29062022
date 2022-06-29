// Importation express.
const express = require('express');

const app = express();

app.use (express.json());

// Exportation du fichier APP.JS.
module.exports = app;