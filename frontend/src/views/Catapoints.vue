<template>
  <div class="attackers_container">
    <CatapointRow
      v-for="catapoint of $store.state.catapoints"
      :key="`catapoint${catapoint.xCoord}${catapoint.yCoord}`"
      :attacker="catapoint"
      :unit-speeds="$store.state.unitSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
      :artefactCounts="$store.state.artefactCounts"
    />
    <InsertCatapoint
      :unit-speeds="$store.state.unitSpeeds"
      :ts-levels="$store.state.tsLevels"
      :hero-boots="$store.state.heroBoots"
      :artefactCounts="$store.state.artefactCounts"
    />
  </div>
</template>

<script>
import CatapointRow from '@/components/Catapoints/CatapointRow';
import InsertCatapoint from '@/components/Catapoints/InsertCatapoint';
export default {
  name: 'Catapoints',
  components: {
    CatapointRow,
    InsertCatapoint,
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
