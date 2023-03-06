//Import de BCrypt.
const bcrypt = require("bcrypt");

//Import de JSON Web Token.
const jwt = require("jsonwebtoken");

//Import du modèle utilisateur.
const User = require("../models/User");

//Export de la requête d'inscription utilisateur.
exports.signup = (request, response, next) => {
    bcrypt.hash(request.body.password, 10)
    .then(hash => {
        const user = new User({
            email: request.body.email,
            password: hash
        });
        user.save()
        .then(() => response.status(201).json({message: "Utilisateur créé."}))
        .catch(error => response.status(400).json({error}));
    })
    .catch(error => response.status(500).json({error}));
};

//Export de la requête de connexion utilisateur.
exports.login = (request, response, next) => {
    User.findOne({email: request.body.email})
    .then(user => {
        if(user === null){
            response.status(401).json({message: "Identifiant incorrect."});
        }else{
            bcrypt.compare(request.body.password, user.password)
            .then(valid => {
                if(!valid){
                    response.status(401).json({message: "Mot de passe incorrect."});
                }else{
                    response.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            "RANDOM_TOKEN_SECRET",
                            {expiresIn: "24h"}
                        )
                    });
                }
            })
            .catch(error => response.status(500).json({error}));
        }
    })
    .catch(error => response.status(500).json({error}));
}