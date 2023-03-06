//Import du middleware multer.
const multer = require("multer");

//Application d'extensions au fichier.
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image.jpeg": "jpeg",
    "image.png": "png"
};

//Enregistrement du stockage sur le disque.
const storage = multer.diskStorage({

    //Premier élément : destination d'enregistrement des fichiers.
    destination: (request, file, callback) => {
        callback(null, "images")
    },

    //Second élément : définition d'un nom de fichier à utiliser.
    filename: (request, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    }
});

//Export du middleware multer, pour un accès externe.
module.exports = multer({storage}).single("image");