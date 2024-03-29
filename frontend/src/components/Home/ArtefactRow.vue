<template>
  <div class="arte_row" :class="dynamicClasses">
    <div v-if="!collapsed" class="collapse_button" @click="collapsed = true">
      -
    </div>
    <div v-if="collapsed" class="expand_button" @click="collapsed = false">
      +
    </div>
    <div v-if="!collapsed">
      <div class="data_item coords">
        {{ artefact.xCoord }}|{{ artefact.yCoord }}
      </div>
      <div class="data_item arte_name">
        {{ capitalise(artefact.size) }} {{ capitalise(artefact.type) }}
      </div>
      <div class="data_item times">
        <div v-if="timeLostWithSelections" class="upper_time">
          {{ formatTravelTime(shortestTime) }}
        </div>
        {{ formatTravelTime(shortestTimeWithSelections) }}
        <div v-if="timeLostWithSelections" class="lower_time">
          +{{ formatTravelTime(timeLostWithSelections) }}
        </div>
      </div>
      <div class="data_item dropdown_parent">
        <select v-model="artesweep" class="dropdown">
          <option :value="null">Select sweep...</option>
          <option
            v-for="artesweep of sortedAvailableSweeps"
            :key="
              `artesweep_to_artefact_${artesweep.xCoord}_${artesweep.yCoord}${artefact.xCoord}${artefact.yCoord}`
            "
            :value="{
              ...artesweep,
            }"
          >
            {{ artesweep.player }} {{ artesweep.xCoord }}|{{
              artesweep.yCoord
            }}
            [{{ clearSizeString(artesweep) }}]
            {{ formatTravelTime(sweepTravelTime(artesweep)) }}
          </option>
        </select>
        <HeroCheckbox v-model="artesweepHero" />
      </div>
      <div class="data_item dropdown_parent">
        <select v-model="catapoint" class="dropdown">
          <option :value="null">Select catas...</option>
          <option
            v-for="catapoint of sortedAvailableCatas"
            :key="
              `catapoint_to_artefact_${catapoint.xCoord}_${catapoint.yCoord}${catapoint.xCoord}${catapoint.yCoord}`
            "
            :value="{
              ...catapoint,
            }"
          >
            {{ catapoint.player }} {{ catapoint.xCoord }}|{{
              catapoint.yCoord
            }}
            [{{ catapoint.artefacts }}]
            {{ formatTravelTime(catapointTravelTime(catapoint)) }}
          </option>
        </select>
        <HeroCheckbox v-model="catapointHero" />
      </div>
      <div class="data_item dropdown_parent">
        <select v-model="treasury" class="dropdown">
          <option :value="null">Select hero...</option>
          <option
            v-for="treasury of sortedAvailableTreasuries"
            :key="
              `treasury_to_artefact_${treasury.xCoord}_${treasury.yCoord}${treasury.xCoord}${treasury.yCoord}`
            "
            :value="{
              ...treasury,
            }"
          >
            {{ treasury.player }} {{ treasury.xCoord }}|{{
              treasury.yCoord
            }}
            [{{ treasury.treasuryLvl }}]
            {{ formatTravelTime(treasuryTravelTime(treasury)) }}
          </option>
        </select>
      </div>
      <div
        class="data_item confirm_button"
        :class="{ disabled: !confirmEnabled }"
        @click="confirm"
      >
        Confirm
      </div>
    </div>
  </div>
</template>

<script>
import { capitalise } from '@/util/stringUtils';
import { getFetcherTravelTime, getShortestTime } from '@/util/travelTime';
import { checkAvailability } from '@/selections';
import HeroCheckbox from './HeroCheckbox.vue';
import api from '@/util/api';
export default {
  name: 'ArtefactRow',
  components: { HeroCheckbox },
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
    collapsed: false,
    artesweepHero: false,
    catapointHero: false,
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
        collapsed: this.collapsed,
      };
    },
    availableSweeps() {
      return this.$store.state.artesweeps.filter(attacker =>
        checkAvailability(attacker, this.artefact, { considerSelections: true })
      );
    },
    availableCatas() {
      return this.$store.state.catapoints.filter(attacker =>
        checkAvailability(attacker, this.artefact, { considerSelections: true })
      );
    },
    availableTreasuries() {
      return this.$store.state.treasuries.filter(attacker =>
        checkAvailability(attacker, this.artefact, { considerSelections: true })
      );
    },
    sortedAvailableSweeps() {
      return [...this.availableSweeps].sort((a, b) => {
        return this.sweepTravelTime(a) - this.sweepTravelTime(b);
      });
    },
    sortedAvailableCatas() {
      return [...this.availableCatas].sort((a, b) => {
        return this.catapointTravelTime(a) - this.catapointTravelTime(b);
      });
    },
    sortedAvailableTreasuries() {
      return [...this.availableTreasuries].sort((a, b) => {
        return this.treasuryTravelTime(a) - this.treasuryTravelTime(b);
      });
    },
    shortestTime() {
      return getShortestTime(this.artefact, {
        considerSelections: false,
        artesweepHero: this.artesweepHero,
        cataHero: this.cataHero,
      });
    },
    shortestTimeWithSelections() {
      return getShortestTime(this.artefact, {
        considerSelections: true,
        artesweepHero: this.artesweepHero,
        cataHero: this.cataHero,
      });
    },
    timeLostWithSelections() {
      return this.shortestTimeWithSelections - this.shortestTime;
    },
    confirmEnabled() {
      return this.artesweep && this.catapoint && this.treasury;
    },
  },
  watch: {
    artesweep(newV, oldV) {
      if (oldV) {
        this.$store.dispatch('removeSelection', {
          artefact: this.artefact,
          attacker: oldV,
        });
        if (this.artesweepHero) {
          this.$store.dispatch('removeSelectedHero', oldV.player);
        }
      }
      if (newV) {
        this.$store.dispatch('addSelection', {
          artefact: this.artefact,
          attacker: newV,
        });
      }
      if (this.artesweepHero) {
        this.artesweepHero = false;
      }
    },
    catapoint(newV, oldV) {
      if (oldV) {
        this.$store.dispatch('removeSelection', {
          artefact: this.artefact,
          attacker: oldV,
        });
        if (this.catapointHero) {
          this.$store.dispatch('removeSelectedHero', oldV.player);
        }
      }
      if (newV) {
        this.$store.dispatch('addSelection', {
          artefact: this.artefact,
          attacker: newV,
        });
      }
      if (this.catapointHero) {
        this.catapointHero = false;
      }
    },
    treasury(newV, oldV) {
      if (oldV) {
        this.$store.dispatch('removeSelection', {
          artefact: this.artefact,
          attacker: oldV,
        });
        this.$store.dispatch('removeSelectedHero', oldV.player);
      }
      if (newV) {
        this.$store.dispatch('addSelection', {
          artefact: this.artefact,
          attacker: newV,
        });
        this.$store.dispatch('addSelectedHero', {
          player: newV.player,
          artefact: this.artefact,
          slot: 'treasury',
        });
      }
    },
    artesweepHero(newV, oldV) {
      if (!this.artesweep) {
        return;
      }
      if (oldV) {
        this.$store.dispatch('removeSelectedHero', this.artesweep.player);
      }
      if (newV) {
        this.$store.dispatch('addSelectedHero', {
          player: this.artesweep.player,
          artefact: this.artefact,
          slot: 'artesweep',
        });
      }
    },
    catapointHero(newV, oldV) {
      if (!this.catapoint) {
        return;
      }
      if (oldV) {
        this.$store.dispatch('removeSelectedHero', this.catapoint.player);
      }
      if (newV) {
        this.$store.dispatch('addSelectedHero', {
          player: this.catapoint.player,
          artefact: this.artefact,
          slot: 'catapoint',
        });
      }
    },
  },
  methods: {
    capitalise(str) {
      return capitalise(str);
    },
    sweepTravelTime(attacker) {
      return getFetcherTravelTime(this.artefact, attacker, {
        hero: this.artesweepHero,
      });
    },
    catapointTravelTime(attacker) {
      return getFetcherTravelTime(this.artefact, attacker, {
        hero: this.catapointHero,
      });
    },
    treasuryTravelTime(attacker) {
      return getFetcherTravelTime(this.artefact, attacker, { hero: true });
    },
    formatTravelTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds - hrs * 3600) / 60);
      const secs = seconds - hrs * 3600 - mins * 60;
      return hrs < 1000
        ? `${hrs < 10 ? '0' : ''}${hrs}:${mins < 10 ? '0' : ''}${mins}:${
            secs < 10 ? '0' : ''
          }${secs}`
        : 'N/A';
    },
    clearSizeString(artesweep) {
      return `${capitalise(
        artesweep.clearWithoutHero.substring(0, 1)
      )}/${capitalise(artesweep.clearWithHero.substring(0, 1))}`;
    },
    async confirm() {
      if (this.confirmEnabled) {
        await api().post('/commands', {
          artefactId: this.artefact._id,
          artesweepAccount: this.artesweep.player,
          artesweepId: this.artesweep._id,
          artesweepHero: this.artesweepHero,
          artesweepTime: this.sweepTravelTime(this.artesweep),
          catapointAccount: this.catapoint.player,
          catapointId: this.catapoint._id,
          catapointHero: this.catapointHero,
          catapointTime: this.catapointTravelTime(this.catapoint),
          treasuryAccount: this.treasury.player,
          treasuryId: this.treasury._id,
          treasuryTime: this.treasuryTravelTime(this.treasury),
        });
        this.$store.dispatch('updateCycle');
      }
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

.collapsed {
  height: 14px;
  padding: 0;
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
  overflow: visible;
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
  text-align: center;
  position: relative;
}

.upper_time {
  position: absolute;
  top: -10px;
  width: 100%;
  font-size: 0.6em;
  text-decoration-line: line-through;
}

.lower_time {
  position: absolute;
  bottom: -10px;
  width: 100%;
  font-size: 0.6em;
  font-weight: bold;
  color: red;
}

.dropdown_parent {
  width: 300px;
  margin-left: 15px;
}

.dropdown {
  width: 275px;
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

.disabled {
  color: #1a1a1a31;
}

.collapse_button {
  width: 8px;
  height: 8px;
  line-height: 7px;
  position: absolute;
  font-weight: bold;
  border: 1px solid;
  margin-top: 5px;
  padding: 1px 4px 1px 4px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.expand_button {
  width: 8px;
  height: 8px;
  line-height: 8px;
  position: absolute;
  font-weight: bold;
  border: 1px solid;
  margin-left: 15px;
  margin-top: 1px;
  padding: 1px 5px 1px 3px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
