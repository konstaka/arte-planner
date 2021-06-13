const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const CommandSchema = new Schema({
  id: ObjectId,
  artefactId: String,
  artesweepAccount: String,
  artesweepId: String,
  artesweepHero: Boolean,
  catapointAccount: String,
  catapointId: String,
  catapointHero: Boolean,
  treasuryAccount: String,
  treasuryId: String,
});

module.exports = mongoose.model('Command', CommandSchema);
