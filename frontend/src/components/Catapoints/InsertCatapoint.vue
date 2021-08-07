<template>
  <div class="attacker_row">
    <div class="data_item explain_text">Add new:</div>
    <div class="data_item inputs">
      x
      <input v-model.number="xCoord" type="number" class="coord_box" />
      y
      <input v-model.number="yCoord" type="number" class="coord_box" />
    </div>
    <div class="data_item tournament_square">
      TS
      <DropDown
        v-model.number="tsLevel"
        :options="tsLevels"
        :initial-value="tsLevel"
      />
    </div>
    <div class="data_item hero_boots">
      hero boots
      <DropDown
        v-model.number="hero"
        :options="heroBoots"
        :initial-value="hero"
      />
    </div>
    <div class="data_item artefacts">
      artefacts
      <DropDown
        v-model.number="artefacts"
        :options="artefactCounts"
        :initial-value="artefacts"
      />
    </div>
    <div class="data_item add_button" @click="addAttacker">Add</div>
  </div>
</template>

<script>
import DropDown from '@/components/common/DropDown';
import api from '@/util/api';
export default {
  name: 'InsertCatapoint',
  components: {
    DropDown,
  },
  props: ['unitSpeeds', 'tsLevels', 'heroBoots', 'arteSizes', 'artefactCounts'],
  data: () => ({
    xCoord: null,
    yCoord: null,
    unitSpeed: 3,
    arteSpeed: 1,
    tsLevel: 0,
    hero: 0,
    artefacts: 1,
  }),
  methods: {
    async addAttacker() {
      await api().post('/catapoints', {
        xCoord: this.xCoord,
        yCoord: this.yCoord,
        tournamentSquare: this.tsLevel,
        heroBoots: this.hero,
        artefacts: this.artefacts,
      });
      this.$store.dispatch('updateCycle');
    },
  },
};
</script>

<style scoped>
.attacker_row {
  width: 100%;
  min-width: 1330px;
  margin: 18px auto;
}

.data_item {
  width: 7%;
  max-height: 22px;
  display: inline-block;
  overflow: hidden;
  text-align: left;
}

.explain_text {
  width: 6%;
  text-align: left;
}

.inputs {
  width: 12%;
  text-align: right;
  padding-right: 5px;
  position: relative;
}

.coord_box {
  width: 42px;
  margin-right: 15px;
  position: initial;
}

input {
  background: #ebf0f4;
}

.unit_speed {
  width: 7%;
}

.tournament_square {
  width: 6%;
}

.hero_boots {
  width: 10%;
}

.artefacts {
  width: 9%;
}

.add_button {
  width: 5%;
  height: 17px;
  margin: 1px 20px;
  font-size: 0.9em;
  text-align: center;
  border: 1px solid #666666;
  background: #f0f4eb;
  cursor: pointer;
}
</style>
