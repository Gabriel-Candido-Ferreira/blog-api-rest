const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: String,
  username: String,
  senha: String,
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
