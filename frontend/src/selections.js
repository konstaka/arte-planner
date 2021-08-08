import store from '@/store/index';

export function comparableArteSize(arteSize) {
  switch (arteSize) {
    case 'unique':
    case 20:
      return 3;
    case 'large':
      return 2;
    case 'small':
    case 10:
      return 1;
    default:
      return -1;
  }
}

export function checkAvailability(attacker, artefact, { considerSelections }) {
  // insufficient clear size in any case
  if (attacker.clearWithHero) {
    if (
      comparableArteSize(attacker.clearWithHero) <
      comparableArteSize(artefact.size)
    ) {
      return false;
    }
  }

  // insufficient clear size due to hero already commanded
  if (attacker.clearWithoutHero) {
    if (
      comparableArteSize(attacker.clearWithoutHero) <
        comparableArteSize(artefact.size) &&
      store.state.commandedHeroes.includes(attacker.player)
    ) {
      return false;
    }
  }

  // insufficient treasury level or hero already commanded
  if (attacker.treasuryLvl) {
    if (
      comparableArteSize(attacker.treasuryLvl) <
        comparableArteSize(artefact.size) ||
      store.state.commandedHeroes.includes(attacker.player)
    ) {
      return false;
    }
  }

  // catapoint used up in commands
  if (attacker.artefacts < 1) {
    return false;
  }

  if (considerSelections) {
    let selections = 0;
    for (const artefactId of Object.keys(store.state.selections)) {
      if (
        artefactId !== artefact._id &&
        store.state.selections[artefactId][attacker._id]
      ) {
        selections++;
      }
    }
    // catapoint.artefacts is used up
    // or not a catapoint, and listed as a selection for some other artefact than this
    if (selections >= (attacker.artefacts || 1)) {
      return false;
    }
  }

  return true;
}
