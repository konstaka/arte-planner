/* eslint-disable no-restricted-properties */
const serverConfig = { size: 200, speed: 1 };

/**
 * Calculates travel time in seconds on a Travian T4 (2019) map
 */
const getTravelTime = (target, attacker, map) => {
  // Distance on a torus surface
  let distance = Math.sqrt(
    Math.pow(
      Math.min(
        Math.abs(attacker.xCoord - target.xCoord),
        serverConfig.size * 2 + 1 - Math.abs(attacker.xCoord - target.xCoord)
      ),
      2
    ) +
      Math.pow(
        Math.min(
          Math.abs(attacker.yCoord - target.yCoord),
          serverConfig.size * 2 + 1 - Math.abs(attacker.yCoord - target.yCoord)
        ),
        2
      )
  );
  // Round as per Travian implementation
  distance = Math.round(distance * Math.pow(10, 5)) / Math.pow(10, 5);
  // Baseline speed
  let squaresPerSecond =
    (attacker.unitSpeed * serverConfig.speed * attacker.arteSpeed) / 60 / 60;
  // Return if distance under 20
  if (distance <= 20) {
    const time = distance / squaresPerSecond;
    return Math.round(map ? (time * 100) / (100 + map) : time);
  }
  // No-TS part of travel
  let travelTime = 20 / squaresPerSecond;
  // Reduce distance
  distance -= 20;
  // Calculate TS and boots factor
  let factor = 1.0 + attacker.tournamentSquare * 0.2;
  factor += (attacker.heroBoots || 0) / 100;
  // Adjust speed
  squaresPerSecond *= factor;
  // Compute remaining time
  travelTime += distance / squaresPerSecond;
  return Math.round(map ? (travelTime * 100) / (100 + map) : travelTime);
};

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  const secs = Math.floor(seconds - hrs * 3600 - mins * 60);
  return hrs < 1000
    ? `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${
        secs < 10 ? '0' : ''
      }${secs}`
    : 'N/A';
};

const target = {
  xCoord: -88,
  yCoord: -41,
};

const jfk = {
  xCoord: -155,
  yCoord: -168,
  unitSpeed: 19,
  arteSpeed: 1,
  tournamentSquare: 20,
};

const splintter = {
  xCoord: -187,
  yCoord: -182,
  unitSpeed: 21,
  arteSpeed: 1,
  tournamentSquare: 20,
};

const teris = {
  xCoord: -188,
  yCoord: 167,
  unitSpeed: 19,
  arteSpeed: 1,
  tournamentSquare: 20,
  heroBoots: 25,
};

const fuzzywuzzy = {
  xCoord: -161,
  yCoord: -169,
  unitSpeed: 19,
  arteSpeed: 1,
  tournamentSquare: 19,
  heroBoots: 25,
};

const sanchez = {
  xCoord: 170,
  yCoord: -177,
  unitSpeed: 19,
  arteSpeed: 1,
  tournamentSquare: 20,
  heroBoots: 50,
};

console.log(formatTime(getTravelTime(target, jfk)));
console.log(formatTime(getTravelTime(target, splintter)));
console.log(formatTime(getTravelTime(target, teris)));
console.log(formatTime(getTravelTime(target, fuzzywuzzy)));
console.log(formatTime(getTravelTime(target, sanchez)));
