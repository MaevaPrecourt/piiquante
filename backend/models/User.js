//Import de Mongoose.
const mongoose = require("mongoose");

//Import du plugin "unique-validator" de Mongoose.
const uniqueValidator = require("mongoose-unique-validator");

//Modèle utilisateur. Vérification de l'unicité de l'adresse e-mail.
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true}, 
    password: {type: String, required: true}
});

//Paramétrage du plugin "unique-validator" de Mongoose.
userSchema.plugin(uniqueValidator);

//Export du modèle utilisateur, pour un accès externe.
module.exports = mongoose.model("User", userSchema);