const express = require("express");
const sauceCtrl = require("../controllers/sauce");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config")

const router = express.Router();

router.post("/", auth, multer, sauceCtrl.postSauces);
router.get("/", auth, sauceCtrl.getSauces);

router.put("/:id", auth, multer, sauceCtrl.modifyOneSauce);
router.delete("/:id", auth, sauceCtrl.deleteOneSauce);
router.get("/:id", auth, sauceCtrl.getOneSauce);

router.post("/:id/like", auth, multer, sauceCtrl.likeOneSauce);

module.exports = router;