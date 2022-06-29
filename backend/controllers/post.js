const Post = require('../models/Post');
const fs = require('fs');
const { log } = require('console');

// Création des posts.
exports.createPost = (req,res,next) => {
    const postObject = JSON.parse(req.body.post)

    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0
    });
    post.save()
    .then(() => res.status(201).json({ message: 'Post enregistré.'}))
    .catch(error => res.status(400).json({ error }));
};

// Modifications des posts.
exports.modifyPost = (req,res,next) => {
    const postObject = req.file ? {...JSON.parse(req.body.post),imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}:{...req.body};


    if(req.file){
        Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId !== req.userId) {
                return res.status(400).json ({
                    message: 'User ID Not Valid'
                })
            }
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.updateOne({ _id: req.params.id }, {...postObject, _id:req.params.id})
                .then(() => res.status(200).json({ message: 'Element mise à jour..'}))
                .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
    } else{
        Post.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id})
        .then(() => res.status(200).json({ message: 'Post modifié.'}))
        .catch(error => res.status(400).json({ error }));
    }
};

// Suppression des posts.
exports.deletePost = (req,res,next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => {
        if (post.userId !== req.userId) {
            return res.status(400).json ({
                message: 'User ID Not Valid'
            })
        }
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimé.'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};

// Renvoi la post avec l'ID.
exports.getOnePost = (req,res,next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

// Renvoi tableau de posts.
exports.getAllPost = (req,res,next) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
}

// Gestion des likes.
exports.userLikePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            if (req.body.like === -1) {
                if (!post.usersDisliked.includes(req.body.userId)){
                    post.dislikes++
                    post.usersDisliked.push(req.body.userId)
                    post.save()
                }
            }
            else if (req.body.like === 1) {
                if (!post.usersLiked.includes(req.body.userId)) {
                    post.likes++
                    post.usersLiked.push(req.body.userId)
                    post.save()
                }
            }
            else if (req.body.like === 0) {
                if (post.usersDisliked.includes(req.body.userId)) {
                    post.usersDisliked.splice(post.usersDisliked.indexOf(req.body.userId), 1)
                    post.dislikes--
                }
                else if (post.usersLiked.includes(req.body.userId)) {
                    post.usersLiked.splice(post.usersLiked.indexOf(req.body.userId), 1)
                    post.likes--
                }
                post.save()
            }
            else {
                res.status(400).json({ error: 'Erreur!' })
                return
            }
            res.status(200).json(post)
        })
        .catch((error) => res.status(404).json({ error: error }))
}