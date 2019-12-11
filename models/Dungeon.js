const mongoose = require('mongoose');
const Monster = require('./Monster')
const Schema = mongoose.Schema;

const dungeonSchema = new Schema ({
    name: String,
    difficulty: String,
    monsters: [{type: Schema.Types.ObjectId, ref:'Monster'}],
    boss: Monster.schema,
    completed: Boolean
})

module.exports = Dungeon = mongoose.model('Dungeon', dungeonSchema)
