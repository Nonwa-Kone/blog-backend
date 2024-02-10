require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");


exports.createUser = (req, res, next)=>{
  bcrypt.genSalt(10)
    .then((salt)=> {
      bcrypt.hash(req.body.password, salt)
        .then((hash) => {
          const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
          });
          user.save()
            .then((user)=> res.status(201).json(user))
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
}

exports.loginUser = (req, res, next)=> {
  User.findOne({ email: req.body.email })
    .then((user)=> {
      bcrypt.compare(req.body.password, user.password)
        .then((passwordIsValid) => {
          if (!passwordIsValid) {
            res.status(401).json({ error: "Mot de passe non valide!" })
          } else {
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: process.env.EXPIRE_DATE });
            user.authToken = token;
            user.save()
              .then(()=> res.status(200).json({user, token}))
              .catch(error => res.status(500).json({ error }));
          };
        })
        .catch((error) => res.status(401).json({ error }));
    })
    .catch((error)=> res.status(500).json({ error }));
}

exports.profilUser = (req, res, next)=>{
  res.status(200).json({ user: req.user, msg: "Bienvenue sur votre profil" });
}

exports.logoutUser = (req, res, next)=> {
  req.user.authToken = "";
  req.user.save()
    .then((user)=> {
      res.status(200).json({ msg: "Vous êtes deconnecté"})
    })
    .catch(error => res.send(error));
}