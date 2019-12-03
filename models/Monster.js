const mongoose = require('mongoose');
const Square = require('./Square')
const Schema = mongoose.Schema;

const monsterSchema = new Schema ({
  name: String,
  level: Number,
  children: [Square.prototype.Schema],
  xp: Number
})

module.exports = Monster = mongoose.model('Monster', monsterSchema)
