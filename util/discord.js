const axios = require('axios');
const { getOne } = require('../util/db');
const { capitalise } = require('../util/stringUtils');

const sendLaunchNotifications = async (command) => {
  const discord = process.env.DISCORD_WEBHOOK_URL;
  if (discord) {
    const artefact = await getOne('artefact', command.artefactId);
    const artesweep = await getOne('artesweep', command.artesweepId);
    const catapoint = await getOne('catapoint', command.catapointId);
    const treasury = await getOne('treasury', command.treasuryId);
    // prettier-ignore
    const content = `
    Targeting ${capitalise(artefact.size)} ${capitalise(artefact.type)} (${artefact.xCoord}|${artefact.yCoord}):\n
    SWEEP - ${artesweep.player} (${artesweep.xCoord}|${artefact.yCoord}); ${command.artesweepHero ? 'WITH HERO' : 'NO HERO'}\n
    CATAPOINT - ${catapoint.player} (${catapoint.xCoord}|${catapoint.yCoord}); ${command.catapointHero ? 'WITH HERO' : 'NO HERO'}\n
    TREASURY - ${treasury.player} (${treasury.xCoord}|${treasury.yCoord})\n
    Negotiate launch times between players. GO!!!`;
    await axios.post(discord, { content });
  }
};

module.exports = { sendLaunchNotifications };
