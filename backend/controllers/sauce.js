const fs = require("fs");
const Sauce = require("../models/Sauce");

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

exports.getSauces = (request, response, next) => {
    Sauce.find()
    .then(sauces => response.status(200).json(sauces))
    .catch(error => response.status(400).json({error}));
};

exports.modifyOneSauce = (request, response, next) => {
    Sauce.updateOne({_id: request.params.id}, {...request.body, _id: request.params.id})
    .then(() => response.status(200).json({message: "Sauce modifiée."}))
    .catch(error => response.status(400).json({error}));
};

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
    .catch(error => {
        response.status(500).json({error});
    });
};

exports.getOneSauce = (request, response, next) => {
    Sauce.findOne({_id: request.params.id})
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({error}));
};