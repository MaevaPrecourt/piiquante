//Import d'Express.
const express = require("express");

//Import du controller utilisateur.
const userCtrl = require("../controllers/user");

//Initialisation de la méthode Router() d'Express.
const router = express.Router();

//Requêtes POST utilisateur (inscription et connexion).
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//Export du router utilisateur, pour un accès externe.
module.exports = router;