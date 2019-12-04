const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const squareSchema = new Schema ({
  color: String,
  value: Number,
  damage: Number,
  poison: Boolean
})

module.exports = Square = mongoose.model('Square', squareSchema)
