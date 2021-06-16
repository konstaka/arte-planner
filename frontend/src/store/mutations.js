import initialState from './state';
import Vue from 'vue';

export default {
  SIGN_IN(state) {
    state.isSignIn = true;
    state.loaded = false;
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
  SET_ARTESWEEPS(state, artesweeps) {
    state.artesweeps = artesweeps;
  },
  SET_ARTESWEEPS_FOR(state, artesweeps) {
    state.sweepsForUnique = artesweeps.unique;
    state.sweepsForLarge = artesweeps.large;
    state.sweepsForSmall = artesweeps.small;
  },
  SET_CATAPOINTS(state, catapoints) {
    state.catapoints = catapoints;
  },
  SET_TREASURIES(state, treasuries) {
    state.treasuries = treasuries;
  },
  SET_TREASURIES_FOR(state, treasuries) {
    state.treasuriesForUnique = treasuries.unique;
    state.treasuriesForLarge = treasuries.large;
    state.treasuriesForSmall = treasuries.small;
  },
  SET_USED_HEROS(state, usedHeros) {
    state.usedHeros = usedHeros;
  },
  SET_ARTEFACTS(state, artefacts) {
    state.artefacts = artefacts;
  },
  SET_COMMANDS(state, commands) {
    state.commands = commands;
  },
  ADD_SELECTION(state, { artefact, attacker }) {
    const selections = { ...state.selections };
    if (!selections[artefact._id]) {
      selections[artefact._id] = {};
    }
    selections[artefact._id][attacker._id] = true;
    state.selections = selections;
  },
  REMOVE_SELECTION(state, { artefact, attacker }) {
    const selections = { ...state.selections };
    if (selections[artefact._id]) {
      delete selections[artefact._id][attacker._id];
    }
    state.selections = selections;
  },
  // TODO: remove this and manage heros in selections
  SET_HERO(state, { player, value }) {
    state.usedHeros[player] = value;
  },
};
