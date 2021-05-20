const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const ArtefactSchema = new Schema({
  id: ObjectId,
  // X-coordinate: NUM(-400 ... 400)
  xCoord: Number,
  // Y-coordinate: NUM(-400 ... 400)
  yCoord: Number,
  // Type: architect | boots | eyes | diet | trainer | storage | confusion | fool
  type: String,
  // Size: small | large | unique
  size: String,
});

module.exports = mongoose.model('Artefact', ArtefactSchema);
