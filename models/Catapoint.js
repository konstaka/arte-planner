const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const CatapointSchema = new Schema({
  id: ObjectId,
  // Ingame player name
  player: String,
  // X-coordinate: NUM(-400 ... 400)
  xCoord: Number,
  // Y-coordinate: NUM(-400 ... 400)
  yCoord: Number,
  // Tournament square: NUM(0 ... 20)
  tournamentSquare: Number,
  // How many artefacts this catapoint can target: NUM(0 ... 100)
  artefacts: Number,
});

module.exports = mongoose.model('Catapoint', CatapointSchema);
