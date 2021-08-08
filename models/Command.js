const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const CommandSchema = new Schema({
  id: ObjectId,
  artefactId: String,
  artesweepAccount: String,
  artesweepId: String,
  artesweepHero: Boolean,
  artesweepTime: Number,
  catapointAccount: String,
  catapointId: String,
  catapointHero: Boolean,
  catapointTime: Number,
  treasuryAccount: String,
  treasuryId: String,
  treasuryTime: Number,
});

module.exports = mongoose.model('Command', CommandSchema);
