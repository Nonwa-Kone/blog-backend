const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authentification = (req, res, next) => {
  const token = req.header('Authorization').replace("Bearer", "").trim();
  const decodedToken = jwt.verify(token, "azertyuiopmlkjdc");
  User.findOne({
    _id: decodedToken.id,
    authToken: token
  })
    .then((user)=>{
      console.log(user);
      if (!user) {
        throw new Error("");
      } else {
        req.user = user;
        next();
      }
    })
    .catch((error) => res.status(401).send("Merci de vous authentifié!"));
};

module.exports = authentification;