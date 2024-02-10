const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Le champ username est obligatoire"],
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, "Le champ e-mail est obligatoire"],
    lowercase: true,
    trim: true,
    unique: true,
    validate(v){
      if(!validator.isEmail(v)){
        throw new Error("Email non valide");
      }
    }
  },
  password: {
    type: String,
    trim: true,
    require: [true, "Le champ mot de passe est obligatoire"]
  },
  authToken: {
    type: String,
    required: false,
  }
}, {timestamp: true});

userSchema.methods.toJSON = function(){
  const user = this.toObject()
  delete user.password;
  delete user.authToken;

  return user;
}

module.exports = mongoose.model("User", userSchema);