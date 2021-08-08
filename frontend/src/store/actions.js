import SettingsService from '@/services/settings';
import api from '@/util/api';

export default {
  async updateCycle(context) {
    if (context.state.roles.includes('admin')) {
      const settings = await SettingsService.get();
      context.commit('SET_CONFIG', settings);

      const artesweeps = await api().get('/artesweeps');
      const catapoints = await api().get('/catapoints');
      const treasuries = await api().get('/treasuries');
      const artefacts = await api().get('/artefacts');
      const commands = await api().get('/commands');

      context.commit(
        'SET_ARTESWEEPS',
        artesweeps.data.filter(artesweep => {
          for (const command of commands.data) {
            if (command.artesweepId === artesweep._id) {
              return false;
            }
          }
          return true;
        })
      );
      context.commit(
        'SET_CATAPOINTS',
        catapoints.data.filter(catapoint => {
          for (const command of commands.data) {
            if (command.catapointId === catapoint._id) {
              return false;
            }
          }
          return true;
        })
      );
      context.commit(
        'SET_TREASURIES',
        treasuries.data.filter(treasury => {
          for (const command of commands.data) {
            if (command.treasuryId === treasury._id) {
              return false;
            }
          }
          return true;
        })
      );
      context.commit(
        'SET_COMMANDED_ARTESWEEPS',
        artesweeps.data.filter(artesweep => {
          for (const command of commands.data) {
            if (command.artesweepId === artesweep._id) {
              return true;
            }
          }
          return false;
        })
      );
      context.commit(
        'SET_COMMANDED_CATAPOINTS',
        catapoints.data.filter(catapoint => {
          for (const command of commands.data) {
            if (command.catapointId === catapoint._id) {
              return true;
            }
          }
          return false;
        })
      );
      context.commit(
        'SET_COMMANDED_TREASURIES',
        treasuries.data.filter(treasury => {
          for (const command of commands.data) {
            if (command.treasuryId === treasury._id) {
              return true;
            }
          }
          return false;
        })
      );
      const commandedHeroes = [];
      for (const command of commands.data) {
        if (command.artesweepHero) {
          commandedHeroes.push(command.artesweepAccount);
        }
        if (command.catapointHero) {
          commandedHeroes.push(command.catapointAccount);
        }
        commandedHeroes.push(command.treasuryAccount);
      }
      context.commit('SET_COMMANDED_HEROES', commandedHeroes);
      context.commit('SET_ARTEFACTS', artefacts.data);
      context.commit('SET_COMMANDS', commands.data);
      context.commit('SET_SELECTIONS', {});
    }
    context.commit('LOADED');
  },
  async addSelection(context, args) {
    context.commit('ADD_SELECTION', args);
  },
  async removeSelection(context, args) {
    context.commit('REMOVE_SELECTION', args);
  },
};
