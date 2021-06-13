const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const CommandSchema = new Schema({
  id: ObjectId,
  artefactId: String,
  arteSweepAccount: String,
  artesweepId: String,
  catapointAccount: String,
  catapointId: String,
  treasuryAccount: String,
  treasuryId: String,
});

module.exports = mongoose.model('Command', CommandSchema);
