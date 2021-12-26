const axios = require('axios');
const { getOne } = require('../util/db');
const { capitalise } = require('../util/stringUtils');

const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds - hrs * 3600) / 60);
  return hrs < 1000
    ? `${hrs < 10 ? '0' : ''}${hrs}h${mins < 10 ? '0' : ''}${mins}min`
    : 'N/A';
};

const sendLaunchNotifications = async (command) => {
  const discord = process.env.DISCORD_WEBHOOK_URL;
  if (discord) {
    const artefact = await getOne('artefact', command.artefactId);
    const artesweep = await getOne('artesweep', command.artesweepId);
    const catapoint = await getOne('catapoint', command.catapointId);
    const treasury = await getOne('treasury', command.treasuryId);
    console.log(command);
    console.log(artefact);
    console.log(artesweep);
    console.log(catapoint);
    console.log(treasury);
    const timing = [
      { type: 'sweep', time: command.artesweepTime },
      { type: 'catapoint', time: command.catapointTime },
      { type: 'pickup hero', time: command.treasuryTime },
    ].sort((a, b) => b.time - a.time);
    console.log('%O', timing);
    // prettier-ignore
    const content = `----------------------------------------\n
    Targeting ${capitalise(artefact.size)} ${capitalise(artefact.type)} (${artefact.xCoord}|${artefact.yCoord}):\n
      SWEEP - ${artesweep.player} (${artesweep.xCoord}|${artesweep.yCoord}); ${command.artesweepHero ? 'WITH HERO' : 'NO HERO'}; traveltime ${formatTime(command.artesweepTime)}
      CATAS - ${catapoint.player} (${catapoint.xCoord}|${catapoint.yCoord}); ${command.catapointHero ? 'WITH HERO' : 'NO HERO'}; traveltime ${formatTime(command.catapointTime)}
      HERO - ${treasury.player} (${treasury.xCoord}|${treasury.yCoord}); traveltime ${formatTime(command.treasuryTime)}\n
    ${capitalise(timing[0].type)} sends first. COORDINATE TIMES BEFORE SENDING. GO!!!\n\n----------------------------------------`;
    console.log(content);
    await axios.post(discord, { content });
  }
};

module.exports = { sendLaunchNotifications };
