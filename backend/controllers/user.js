const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const emailValidator = require("email-validator");

// Création d'un mot de passe fort.
var passwordValidator = require("password-validator");

// Create a schema.
const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

function nameCheck(name) {
  const regexName =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  if (
    typeof name == "string" &&
    name !== "" &&
    name.length > 2 &&
    regexName.test(name)
  )
    return true;
  else return false;
}
// Inscription de l'utilisateur et cryptage du password.
exports.signup = (req, res, next) => {
  if (
    !emailValidator.validate(req.body.email) ||
    req.body.email.indexOf("@groupomania.fr") === -1
  ) {
    return res
      .status(400)
      .json({ message: "Verifiez le format de votre addresse e-mail" });
  } else if (!passwordSchema.validate(req.body.password)) {
    return res.status(400).json({
      message:
        "Votre mot de passe doit contenir entre 8 et 20 caractères, sans espace et au minimum 1 chiffre, 1 minuscule et 1 majuscule",
    });
  } else if (!nameCheck(req.body.firstName)) {
    return res
      .status(400)
      .json({ message: "Merci d'écrire votre prénom correctement" });
  } else if (!nameCheck(req.body.lastName)) {
    return res
      .status(400)
      .json({ message: "Merci d'écrire votre nom correctement" });
  } else {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() =>
            res.status(201).json({ message: "Utilisateur enregistré." })
          )
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
};

exports.login = (req, res, next) => {
  console.log("login");
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error:
            "Impossible de se connecter!Verifier votre email ou mot de passe!",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error:
                "Impossible de se connecter!Verifier votre email ou mot de passe!",
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id, role: user.role },
              process.env.JWTTOKEN,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
