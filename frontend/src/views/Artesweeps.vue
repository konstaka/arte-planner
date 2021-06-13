<template>
  <div class="attackers_container">
    <ArtesweepRow
      v-for="artesweep of $store.state.artesweeps"
      :key="`artesweep${artesweep.xCoord}${artesweep.yCoord}`"
      :attacker="artesweep"
      :unit-speeds="$store.state.unitSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
      :arte-sizes="$store.state.arteSizes"
    />
    <InsertArtesweep
      :unit-speeds="$store.state.unitSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
      :arte-sizes="$store.state.arteSizes"
    />
  </div>
</template>

<script>
import ArtesweepRow from '@/components/Artesweeps/ArtesweepRow';
import InsertArtesweep from '@/components/Artesweeps/InsertArtesweep';
export default {
  name: 'Artesweeps',
  components: {
    ArtesweepRow,
    InsertArtesweep,
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
