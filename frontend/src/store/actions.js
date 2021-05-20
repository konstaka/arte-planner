import SettingsService from '@/services/settings';

export default {
  async updateCycle(context) {
    if (context.state.roles.includes('admin')) {
      await context.dispatch('getInfo');
    }
    context.commit('LOADED');
  },
  async getInfo(context) {
    await context.dispatch('getSettings');
  },
  async getSettings(context) {
    const settings = await SettingsService.get();
    context.commit('SET_CONFIG', settings);
  },
};
