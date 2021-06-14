<template>
  <div class="arte_row" :class="dynamicClasses">
    <div class="data_item coords">
      {{ artefact.xCoord }}|{{ artefact.yCoord }}
    </div>
    <div class="data_item arte_name">
      {{ capitalise(artefact.size) }} {{ capitalise(artefact.type) }}
    </div>
    <div class="data_item times">
      {{ shortestTime }}
    </div>
    <div class="data_item dropdown_parent">
      <select v-model="artesweep" class="dropdown">
        <option :value="null">Select sweep...</option>
        <option
          v-for="artesweep of $store.state.artesweeps"
          :key="
            `artesweep_to_artefact_${artesweep.xCoord}_${artesweep.yCoord}${artefact.xCoord}${artefact.yCoord}`
          "
          :value="{
            player: artesweep.player,
            _id: artesweep._id,
            __v: artesweep.__v,
            xCoord: artesweep.xCoord,
            yCoord: artesweep.yCoord,
            tournamentSquare: artesweep.tournamentSquare,
            unitSpeed: artesweep.unitSpeed,
            heroBoots: artesweep.heroBoots,
          }"
        >
          {{ artesweep.player }} ({{ artesweep.xCoord }}|{{ artesweep.yCoord }})
          {{ formatTravelTime(travelTime(artesweep)) }}
        </option>
      </select>
    </div>
    <div class="data_item dropdown_parent">
      <select v-model="catapoint" class="dropdown">
        <option :value="null">Select catas...</option>
        <option
          v-for="catapoint of $store.state.catapoints"
          :key="
            `catapoint_to_artefact_${catapoint.xCoord}_${catapoint.yCoord}${catapoint.xCoord}${catapoint.yCoord}`
          "
          :value="{
            player: catapoint.player,
            _id: catapoint._id,
            __v: catapoint.__v,
            xCoord: catapoint.xCoord,
            yCoord: catapoint.yCoord,
            tournamentSquare: catapoint.tournamentSquare,
            heroBoots: catapoint.heroBoots,
            artefacts: catapoint.artefacts,
          }"
        >
          {{ catapoint.player }} ({{ catapoint.xCoord }}|{{ catapoint.yCoord }})
          {{ formatTravelTime(travelTime(catapoint)) }}
        </option>
      </select>
    </div>
    <div class="data_item dropdown_parent">
      <select v-model="treasury" class="dropdown">
        <option :value="null">Select hero...</option>
        <option
          v-for="treasury of $store.state.treasuries"
          :key="
            `treasury_to_artefact_${treasury.xCoord}_${treasury.yCoord}${treasury.xCoord}${treasury.yCoord}`
          "
          :value="{
            player: treasury.player,
            _id: treasury._id,
            __v: treasury.__v,
            xCoord: treasury.xCoord,
            yCoord: treasury.yCoord,
            tournamentSquare: treasury.tournamentSquare,
            unitSpeed: treasury.unitSpeed,
            heroBoots: treasury.heroBoots,
            treasuryLvl: treasury.treasuryLvl,
          }"
        >
          {{ treasury.player }} ({{ treasury.xCoord }}|{{ treasury.yCoord }})
          {{ formatTravelTime(travelTime(treasury)) }}
        </option>
      </select>
    </div>
    <div class="data_item confirm_button" @click="confirm">Confirm</div>
  </div>
</template>

<script>
import { capitalise } from '@/util/stringUtils';
import { getFetcherTravelTime, getShortestTime } from '@/util/travelTime';
export default {
  name: 'ArtefactRow',
  props: ['artefact'],
  data: () => ({
    options: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
    artesweep: null,
    catapoint: null,
    treasury: null,
  }),
  computed: {
    dynamicClasses() {
      return {
        eyes: this.artefact.type === 'eyes',
        diet: this.artefact.type === 'diet',
        boots: this.artefact.type === 'boots',
        trainer: this.artefact.type === 'trainer',
        confuser: this.artefact.type === 'confuser',
        fool: this.artefact.type === 'fool',
        architect: this.artefact.type === 'architect',
        storage: this.artefact.type === 'storage',
      };
    },
    shortestTime() {
      return this.formatTravelTime(getShortestTime(this.artefact));
    },
    shortestTimeWithSelections() {
      return new Date().toLocaleTimeString('en-GB', this.options);
    },
    timeLostWithSelections() {
      return new Date().toLocaleTimeString('en-GB', this.options);
    },
  },
  methods: {
    capitalise(str) {
      return capitalise(str);
    },
    travelTime(attacker) {
      return getFetcherTravelTime(this.artefact, attacker);
    },
    formatTravelTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds - hrs * 3600) / 60);
      const secs = seconds - hrs * 3600 - mins * 60;
      return `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${
        secs < 10 ? '0' : ''
      }${secs}`;
    },
    confirm() {
      console.log('sending commands');
    },
  },
};
</script>

<style scoped>
.arte_row {
  width: 100%;
  height: 22px;
  padding: 15px;
  min-width: 1330px;
  margin: 0px auto;
}

.eyes {
  background: #2d9bf059;
}

.diet {
  background: #fef54559;
}

.boots {
  background: #0ca75fb9;
}

.trainer {
  background: #f24826b9;
}

.confuser {
  background: lightpink;
}

.fool {
  background: #9510ac88;
}

.storage {
  background: rgba(205, 134, 63, 0.808);
}

.architect {
  background: #1a1a1a31;
}

.data_item {
  width: 140px;
  height: 22px;
  display: inline-block;
  overflow: hidden;
  text-align: left;
}

.coords {
  width: 80px;
}

.arte_name {
  width: 140px;
}

.times {
  width: 80px;
}

.dropdown_parent {
  width: 222px;
  margin-left: 15px;
}

.dropdown {
  width: 215px;
  background: #ebf0f4;
  cursor: pointer;
}

.player_name a,
.send_link a {
  color: #2c3e50;
}

.ghost_send {
  width: 215px;
  margin-left: 30px;
}

.send_link {
  width: auto;
}

.confirm_button {
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
