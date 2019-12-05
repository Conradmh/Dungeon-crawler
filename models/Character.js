const mongoose = require('mongoose');
const User = require('./User')
const Schema = mongoose.Schema;

const characterSchema = new Schema ({
  name: String,
  classType: String,
  health: Number,
  physAtk: Number,
  magPwr: Number,
  level: Number,
  users: [{type: Schema.Types.ObjectId, ref:'User'}]
})

module.exports = Character = mongoose.model('Character', characterSchema)
