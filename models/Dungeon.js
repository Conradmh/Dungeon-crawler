const mongoose = require('mongoose');
const Monster = require('./Monster')
const Schema = mongoose.Schema;

const dungeonSchema = new Schema ({
  name: String,
  difficulty: Number,
  monArray: [Monster.schema],
  boss: Monster.schema,
  completed: Boolean
})

module.exports = Dungeon = mongoose.model('Dungeon', dungeonSchema)
