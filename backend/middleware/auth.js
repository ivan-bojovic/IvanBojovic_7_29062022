const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
    try {
        // Vérification de la validité du token d'authentification.
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWTTOKEN)
        const userId = decodedToken.userId
        const role = decodedToken.role

        req.userId = userId;
        req.userRole = role;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID Not Valid'
        } else {
            next()
        }
    } catch (error) {
        // Si le token n'est pas le bon.
        console.log(error)
        res.status(401).json({ error: 'Unauthentified Request !' })
    }
}