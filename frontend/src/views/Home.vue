<template>
  <div class="wrapper">
    <ArtefactRow
      v-for="artefact of $store.state.artefacts"
      :key="`artefact_${artefact.xCoord}_${artefact.yCoord}`"
      :artefact="artefact"
    />
  </div>
</template>

<script>
import ArtefactRow from '../components/Home/ArtefactRow.vue';
export default {
  name: 'Home',
  components: { ArtefactRow },
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
