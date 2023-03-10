//Import de Mongoose.
const mongoose = require("mongoose");

//Modèle sauce. Tableaux de chaînes pour les deux dernières propriétés.
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true}
});

//Export du modèle sauce, pour un accès externe.
module.exports = mongoose.model("Sauce", sauceSchema);