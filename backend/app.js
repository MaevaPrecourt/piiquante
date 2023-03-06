//Import et configuration de DotEnv.
const dotenv = require("dotenv").config();

//Import d'Express.
const express = require("express");

//Import de Mongoose.
const mongoose = require("mongoose");

//Import de "path" pour l'arborescence "images".
const path = require("path");

//Import des routes sauce et utilisateur.
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");

//Initialisation de la méthode Express.
const app = express();

//Body parsing.
app.use(express.json());

//Connexion à MongoDB via Mongoose, et cryptage de l'URI via DotEnv.
mongoose.connect(process.env.URI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connexion à MongoDB réussie !"))
.catch(() => console.log("Connexion à MongoDB échouée !"));

//Middleware de contour de la configuration CORS par défaut.
app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

//Renvoi de fichiers statiques pour la route "images".
app.use("/images", express.static(path.join(__dirname, "images")));

//Utilisation des routes sauce et utilisateur.
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

//Export de l'application Express, pour un accès externe.
module.exports = app;