<template>
  <div class="wrapper">
    <ArtefactRow
      v-for="artefact of sortedArtefacts"
      :key="`artefact_${artefact.xCoord}_${artefact.yCoord}`"
      :artefact="artefact"
    />
  </div>
</template>

<script>
import ArtefactRow from '@/components/Home/ArtefactRow.vue';
import { getShortestTime } from '@/util/travelTime';
export default {
  name: 'Home',
  components: { ArtefactRow },
  computed: {
    sortedArtefacts() {
      return [...this.$store.state.artefacts].sort((a, b) => {
        return (
          getShortestTime(a, { considerSelections: false }) -
          getShortestTime(b, { considerSelections: false })
        );
      });
    },
  },
};
</script>

<style>
.wrapper {
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .wrapper {
    overflow-x: scroll;
  }
}
</style>
