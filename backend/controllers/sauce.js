//Import du File System.
const fs = require("fs");

//Import du modèle sauce.
const Sauce = require("../models/Sauce");


//Export de la requête d'envoi de la sauce.
exports.postSauces = (request, response, next) => {
    const sauceObject = JSON.parse(request.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        _userId: request.auth.userId,
        imageUrl: `${request.protocol}://${request.get("host")}/images/${request.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then(() => response.status(201).json({message: "Sauce enregistrée."}))
    .catch(error => response.status(400).json({error}));
};

//Export de la requête d'obtention d'un array des sauces enregistrées.
exports.getSauces = (request, response, next) => {
    Sauce.find()
    .then(sauces => response.status(200).json(sauces))
    .catch(error => response.status(400).json({error}));
};

//Export de la requête de modification d'une seule sauce.
exports.modifyOneSauce = (request, response, next) => {
    const sauceObject = request.file ?
    {
        ...JSON.parse(request.body.sauce),
        imageUrl: `${request.protocol}://${request.get("host")}/images/${request.file.filename}`
    }:{
        ...request.body
    }
    Sauce.updateOne({_id: request.params.id}, {...sauceObject, _id: request.params.id})
    .then(() => response.status(200).json({message: "Sauce modifiée."}))
    .catch(error => response.status(400).json({error}))
};

//Export de la requête de suppression d'une seule sauce.
exports.deleteOneSauce = (request, response, next) => {
    Sauce.findOne({_id: request.params.id})
    .then(sauce => {
        if(sauce.userId != request.auth.userId){
            response.status(401).json({message: "Non autorisé."});
        }else{
            const filename = sauce.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: request.params.id})
                .then(() => response.status(200).json({message: "Sauce supprimée."}))
                .catch(error => response.status(401).json({error}));
            });
        }
    })
    .catch(error => response.status(500).json({error}));
};

//Export de la requête d'obtention d'une seule sauce.
exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({_id: request.params.id})
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({error}));
};

//Export de la requête d'attribution de likes / dislikes.
exports.likeDislike = (request, response, next) => {
    const like = request.body.like;
    const userId = request.body.userId;
    const sauceId = request.params.id;
    if(like === 1){
        Sauce.updateOne(
            {
                _id: sauceId
            },
            {
                $push:{usersLiked: userId},
                $inc:{likes: +1}
            }
        )
        .then(() => response.status(200).json({message: "+1 Like"}))
        .catch((error) => response.status(400).json({error}))
    }
    if(like === -1){
        Sauce.updateOne(
            {_id: sauceId},
            {
                $push:{usersDisliked: userId},
                $inc:{dislikes: +1}
            }
        )
        .then(() => response.status(200).json({message: "+1 Dislike"}))
        .catch(error => response.status(400).json({error}));
    }
    if(like === 0){
        Sauce.findOne(
            {_id: sauceId}
        )
        .then(sauce => {
            if(sauce.usersLiked.includes(userId)){
                Sauce.updateOne(
                    {_id: sauceId},
                    {
                        $pull:{usersLiked: userId},
                        $inc:{likes: -1}
                    }
                )
                .then(() => response.status(200).json({message: "-1 Like"}))
                .catch(error => response.status(400).json({error}));
            }
            if(sauce.usersDisliked.includes(userId)){
                Sauce.updateOne(
                    {_id: sauceId},
                    {
                        $pull:{usersDisliked: userId},
                        $inc:{dislikes: -1}
                    }
                )
                .then(() => response.status(200).json({message: "-1 Dislike"}))
                .catch(error => response.status(400).json({error}));
            }
        })
        .catch((error) => response.status(404).json({error}));
    }
}