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
  },
  async getCatapoints(context) {
    const res = await api().get('/catapoints');
    context.commit('SET_CATAPOINTS', res.data);
  },
  async getTreasuries(context) {
    const res = await api().get('/treasuries');
    context.commit('SET_TREASURIES', res.data);
  },
  async getArtefacts(context) {
    const res = await api().get('/artefacts');
    context.commit('SET_ARTEFACTS', res.data);
  },
  async getCommands(context) {
    const res = await api().get('/commands');
    context.commit('SET_COMMANDS', res.data);
  },
  async addSelection(context, args) {
    context.commit('ADD_SELECTION', args);
  },
  async removeSelection(context, args) {
    context.commit('REMOVE_SELECTION', args);
  },
};
