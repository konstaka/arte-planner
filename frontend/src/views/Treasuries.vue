<template>
  <div class="attackers_container">
    <TreasuryRow
      v-for="treasury of $store.state.treasuries"
      :key="`treasury${treasury.xCoord}${treasury.yCoord}`"
      :attacker="treasury"
      :unit-speeds="$store.state.unitSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
      :treasury-levels="$store.state.treasuryLevels"
    />
    <InsertTreasury
      :unit-speeds="$store.state.unitSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
      :treasury-levels="$store.state.treasuryLevels"
    />
  </div>
</template>

<script>
import TreasuryRow from '@/components/Treasuries/TreasuryRow';
import InsertTreasury from '@/components/Treasuries/InsertTreasury';
export default {
  name: 'Treasuries',
  components: {
    TreasuryRow,
    InsertTreasury,
  },
};
</script>

<style scoped>
.attackers_container {
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .attackers_container {
    overflow-x: scroll;
  }
}
</style>
