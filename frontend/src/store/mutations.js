import initialState from './state';
import Vue from 'vue';
export default {
  SIGN_IN(state) {
    state.isSignIn = true;
  },
  SIGN_OUT(state) {
    for (const prop in state) {
      state[prop] = initialState[prop];
    }
    Vue.$cookies.remove('id_token');
  },
  SET_USER_ROLES(state, roles) {
    state.roles = roles.filter(r => r.length > 0);
  },
  LOADED(state) {
    state.loaded = true;
  },
  SET_CONFIG(state, settings) {
    state.serverConfig = settings;
  },
  SET_COMMANDS(state, commands) {
    state.commands = commands;
  },
  SET_ARTEFACTS(state, artefacts) {
    state.artefacts = artefacts;
  },
  SET_ARTESWEEPS(state, artesweeps) {
    state.artesweeps = artesweeps;
  },
  SET_CATAPOINTS(state, catapoints) {
    state.catapoints = catapoints;
  },
  SET_TREASURIES(state, treasuries) {
    state.treasuries = treasuries;
  },
};
