const Post = require('../models/Post');
const fs = require('fs');
const { log } = require('console');

// Création des posts.
exports.createPost = (req,res,next) => {

    const postObject = JSON.parse(req.body.post)
    const imageVide = req.file === undefined ;
    const textVide = postObject.text === undefined || postObject.text === "" ;
    console.log(imageVide, textVide, postObject.imageUrl)
    if(imageVide && textVide)  {
        return res.status(400).json({message:'Votre post ne peut pas etre vide'});
    }

    const post = new Post({
        ...postObject,
        createdAt: new Date().toJSON(),
        likes: 0,
        dislikes: 0
    });
    if(req.file) {
        post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    post.save()
    .then(() => res.status(201).json({ message: 'Post enregistré',post}))
    .catch(error => res.status(400).json({ error }));
};


// Modifications des posts.
exports.modifyPost = (req,res,next) => {
    const postObject = req.file ? {...JSON.parse(req.body.post),imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}:{...req.body};


    if(req.file){
        Post.findOne({ _id: req.params.id })
        .then(post => {
            if (post.userId !== req.userId || req.userRole !=="admin") {
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
        console.log(req.userId, post.userId, req.userId === post.userId)
        if (post.userId !== req.userId && req.userRole !=="admin" ) {
            return res.status(400).json ({
                message: 'User ID Not Valid'
            })
        }
        if(post.imageUrl){
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimé.'}))
            .catch(error => res.status(400).json({ error }));
        });
      }
      else {
        Post.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Post supprimé.'}))
            .catch(error => res.status(400).json({ error }));
      }
    });
}

// Renvoi la post avec l'ID.
exports.getOnePost = (req,res,next) => {
    Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
}

// Renvoi tableau de posts.
exports.getAllPost = (req,res,next) => {
    Post.find().sort([['createdAt', 'descending']])
    .exec((err, posts) => {
        console.log('exec done', err, posts);
        res.status(200).json(posts)
    })
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
                else {
                    return res.status(400).json({ error: 'Vous pouvez dislike le post qu\'une fois' })
                }
            }
            else if (req.body.like === 1) {
                if (!post.usersLiked.includes(req.body.userId)) {
                    post.likes++
                    post.usersLiked.push(req.body.userId)
                    post.save()
                }else {
                    return res.status(400).json({ error: 'Vous pouvez aimer le post qu\'une fois' })
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
                res.status(400).json({ error: 'veuillez liker ou disliker le post' })
                return
            }
            res.status(200).json(post)
        })
        .catch((error) => 
        {  console.log("error", error)
            res.status(404).json({ error: error.message })
        })

}