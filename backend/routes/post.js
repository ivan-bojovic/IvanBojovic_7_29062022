const postCtrl = require('../controllers/post');



// Renvoi tableau de posts.
router.get('/' , auth, postCtrl.getAllPost);

// Création des posts.
router.post('/', auth, multer, postCtrl.createPost);

// Renvoi la post avec l'ID.
router.get('/:id', auth, postCtrl.getOnePost);

// Modifications des posts.
router.put('/:id', auth, multer, postCtrl.modifyPost);

// Suppression des posts.
router.delete('/:id', auth, postCtrl.deletePost);

router.post('/:id/like', auth, postCtrl.userLikePost);


module.exports = router;