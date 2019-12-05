const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const squareSchema = new Schema ({
  color: String,
  value: Number,
  damage: Number,
  poison: Number
})

module.exports = Square = mongoose.model('Square', squareSchema)
