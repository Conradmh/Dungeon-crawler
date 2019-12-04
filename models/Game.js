const mongoose = require('mongoose');
const User = require('./User');
const Dungeon = require('./Dungeon')
const Schema = mongoose.Schema;

const gameSchema = new Schema ({
  name: String,
  //player: [{ type: Schema.Types.objectId, ref: 'User'}],
  charArray: Array,
  //dungeon:[{ type: Schema.Types.ObjectId, ref: 'Dungeon' }],
  // dungeonProgress:[(current values of dungeon.Schema), (current values of character.Schema )]
})

module.exports = Game = mongoose.model('Game', gameSchema)
