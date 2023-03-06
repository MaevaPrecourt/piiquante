//Import de JSON Web Token.
const jwt = require("jsonwebtoken");

//Export du middleware d'authentification, pour un accès externe.
module.exports = (request, response, next) => {

    //Récupération d'un même Token pour toute requête utilisateur.
    try{
        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        request.auth = {
            userId: userId
        };

        //ID inscription & connexion = identiques à l'userID ?
        if(request.body.userId && request.body.userId != userId){
            throw new Error("Non autorisé.");
        }else{
            next();
        }
    }catch(error){
        response.status(401).json({error});
    }
};