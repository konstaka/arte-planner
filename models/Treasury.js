const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = mongoose;

const TreasurySchema = new Schema({
  id: ObjectId,
  // Ingame player name
  player: String,
  // X-coordinate: NUM(-400 ... 400)
  xCoord: Number,
  // Y-coordinate: NUM(-400 ... 400)
  yCoord: Number,
  // Unit speed: NUM(>=3) // Hero base speed without spurs
  unitSpeed: Number,
  // Tournament square: NUM(0 ... 20)
  tournamentSquare: Number,
  // Hero boots: ENUM(25, 50, 75)
  heroBoots: Number,
  // Treasury level: ENUM(10, 20)
  treasuryLvl: Number,
});

module.exports = mongoose.model('Treasury', TreasurySchema);
