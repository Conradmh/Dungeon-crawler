const mongoose = require('mongoose');
const Square = require('./Square')
const Schema = mongoose.Schema;

const monsterSchema = new Schema ({
  name: String,
  level: Number,
  squares: {
    type: [Square.schema],
    default: undefined
  },
  xp: Number,
  boss: Boolean
})

module.exports = Monster = mongoose.model('Monster', monsterSchema)
