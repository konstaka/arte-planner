import SettingsService from '@/services/settings';
import api from '@/util/api';

export default {
  async updateCycle(context) {
    if (context.state.roles.includes('admin')) {
      await context.dispatch('getSettings');
      await context.dispatch('getArtesweeps');
      await context.dispatch('getCatapoints');
      await context.dispatch('getTreasuries');
      await context.dispatch('getArtefacts');
      await context.dispatch('getCommands');
    }
    context.commit('LOADED');
  },
  async getSettings(context) {
    const settings = await SettingsService.get();
    context.commit('SET_CONFIG', settings);
  },
  async getArtesweeps(context) {
    const res = await api().get('/artesweeps');
    context.commit('SET_ARTESWEEPS', res.data);
    // const sweepsFor = {};
    // ['unique', 'large', 'small'].forEach(size => {
    //   sweepsFor[size] = (res.data || []).filter(sweep =>
    //     [sweep.clearWithoutHero, sweep.clearWithHero].some(
    //       clear => comparableArteSize(clear) >= comparableArteSize(size)
    //     )
    //   );
    // });
    // context.commit('SET_ARTESWEEPS_FOR', sweepsFor);
  },
  async getCatapoints(context) {
    const res = await api().get('/catapoints');
    context.commit('SET_CATAPOINTS', res.data);
  },
  async getTreasuries(context) {
    const res = await api().get('/treasuries');
    context.commit('SET_TREASURIES', res.data);
    // const treasuriesFor = {};
    // ['unique', 'large', 'small'].forEach(size => {
    //   treasuriesFor[size] = (res.data || []).filter(
    //     treasury =>
    //       comparableArteSize(treasury.treasuryLvl) >= comparableArteSize(size)
    //   );
    // });
    // context.commit('SET_TREASURIES_FOR', treasuriesFor);
  },
  async getArtefacts(context) {
    const res = await api().get('/artefacts');
    context.commit('SET_ARTEFACTS', res.data);
  },
  async getCommands(context) {
    const res = await api().get('/commands');
    context.commit('SET_COMMANDS', res.data);
    // TODO
    // const usedHeros = {};
    // for (const command of res.data || []) {
    //   if (command.arteSweepHero) {
    //     usedHeros[command.arteSweepAccount] = true;
    //   }
    //   if (command.catapointHero) {
    //   }
    // }
  },
  async addSelection(context, { artefact, attacker }) {
    context.commit('ADD_SELECTION', { artefact, attacker });
  },
  async removeSelection(context, artefact, attacker) {
    context.commit('REMOVE_SELECTION', artefact, attacker);
  },
};
