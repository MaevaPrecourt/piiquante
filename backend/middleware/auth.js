const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
    try{
        const token = request.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        request.auth = {
            userId: userId
        };
        if(request.body.userId && request.body.userId != userId){
            throw new Error("Non autorisé.");
        }else{
            next();
        }
    }catch(error){
        response.status(401).json({error});
    }
};