//Import d'Express.
const express = require("express");

//Import du controller sauce.
const sauceCtrl = require("../controllers/sauce");

//Import du middleware d'authentification.
const auth = require("../middleware/auth");

//Import du middleware multer.
const multer = require("../middleware/multer-config")

//Initialisation de la méthode Router() d'Express.
const router = express.Router();

//Requête POST sauce (envoi de la sauce via le formulaire de création).
router.post("/", auth, multer, sauceCtrl.postSauces);

//Requête GET sauce (obtention d'un array des sauces enregistrées).
router.get("/", auth, sauceCtrl.getSauces);

//Requête PUT sauce (modification d'une seule sauce).
router.put("/:id", auth, multer, sauceCtrl.modifyOneSauce);

//Requête DELETE sauce (suppression d'une seule sauce).
router.delete("/:id", auth, sauceCtrl.deleteOneSauce);

//Requête GET sauce (obtention d'une seule sauce).
router.get("/:id", auth, sauceCtrl.getOneSauce);

//Requête POST sauce (attribution de likes / dislikes).
router.post("/:id/like", auth, multer, sauceCtrl.likeDislike);

//Export du router utilisateur, pour un accès externe.
module.exports = router;