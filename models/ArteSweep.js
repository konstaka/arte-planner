const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const ArteSweepSchema = new Schema({
  id: ObjectId,
  // Ingame player name
  player: String,
  // X-coordinate: NUM(-400 ... 400)
  xCoord: Number,
  // Y-coordinate: NUM(-400 ... 400)
  yCoord: Number,
  // Unit speed: NUM(>=3)
  unitSpeed: Number,
  // Tournament square: NUM(0 ... 20)
  tournamentSquare: Number,
  // Hero boots: ENUM(25, 50, 75)
  heroBoots: Number,
  // Which artefact this sweep can clear without hero: small | large | unique
  clearWithoutHero: String,
  // Which artefact this sweep can clear with hero: small | large | unique
  clearWithHero: String,
});

module.exports = mongoose.model('ArteSweep', ArteSweepSchema);
