const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

// Renvoi tableau de posts.
router.get("/", postCtrl.getAllPost);

// Création des posts.
router.post("/", auth, multer, postCtrl.createPost);

// Renvoi la post avec l'ID.
router.get("/:id", postCtrl.getOnePost);

// Modifications des posts.
router.put("/:id", auth, multer, postCtrl.modifyPost);

// Suppression des posts.
router.delete("/:id", auth, postCtrl.deletePost);

router.post("/:id/like", auth, postCtrl.userLikePost);

module.exports = router;
