<template>
  <div class="attacker_row">
    <div class="data_item explain_text">Add new:</div>
    <div class="data_item inputs">
      x
      <input v-model.number="xCoord" type="number" class="coord_box" />
      y
      <input v-model.number="yCoord" type="number" class="coord_box" />
    </div>
    <div class="data_item unit_speed">
      <DropDown
        v-model.number="unitSpeed"
        :options="unitSpeeds"
        :initial-value="unitSpeed"
      />
      sq/h
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
    <div class="data_item without_hero">
      treasury level
      <DropDown
        v-model.number="treasuryLvl"
        :options="treasuryLevels"
        :initial-value="treasuryLvl"
      />
    </div>
    <div class="data_item add_button" @click="addAttacker">Add</div>
  </div>
</template>

<script>
import DropDown from '@/components/common/DropDown';
import api from '@/util/api';
export default {
  name: 'InsertTreasury',
  components: {
    DropDown,
  },
  props: ['unitSpeeds', 'tsLevels', 'heroBoots', 'treasuryLevels'],
  data: () => ({
    xCoord: null,
    yCoord: null,
    unitSpeed: 3,
    arteSpeed: 1,
    tsLevel: 0,
    hero: 0,
    treasuryLvl: 10,
  }),
  methods: {
    async addAttacker() {
      await api().post('/treasuries', {
        xCoord: this.xCoord,
        yCoord: this.yCoord,
        unitSpeed: this.unitSpeed,
        tournamentSquare: this.tsLevel,
        heroBoots: this.hero,
        treasuryLvl: this.treasuryLvl,
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

.without_hero {
  width: 11%;
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
