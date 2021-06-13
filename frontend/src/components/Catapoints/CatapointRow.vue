<template>
  <div class="attacker_row">
    <div class="data_item player_name">
      {{ attacker.player }}
    </div>
    <div class="data_item coords">
      ({{ attacker.xCoord }}|{{ attacker.yCoord }})
    </div>
    <div class="data_item tournament_square">
      TS
      <DropDown
        v-model.number="mutableAttacker.tournamentSquare"
        :options="tsLevels"
        :initial-value="attacker.tournamentSquare"
      />
    </div>
    <div class="data_item hero_boots">
      hero boots
      <DropDown
        v-model.number="mutableAttacker.heroBoots"
        :options="heroBoots"
        :initial-value="attacker.heroBoots"
      />
    </div>
    <div class="data_item artefacts">
      artefacts
      <DropDown
        v-model.number="mutableAttacker.artefacts"
        :options="artefactCounts"
        :initial-value="attacker.artefacts"
      />
    </div>
    <div class="data_item delete_button" @click="deleteAttacker">Delete</div>
  </div>
</template>

<script>
import DropDown from '@/components/common/DropDown';
import api from '@/util/api';
export default {
  name: 'CatapointRow',
  components: {
    DropDown,
  },
  props: ['attacker', 'unitSpeeds', 'tsLevels', 'heroBoots', 'artefactCounts'],
  data: () => ({
    mutableAttacker: {},
    loaded: false,
  }),
  watch: {
    mutableAttacker: {
      deep: true,
      handler() {
        if (this.loaded) {
          this.updateAttacker();
        }
      },
    },
  },
  mounted() {
    this.mutableAttacker = {
      ...this.attacker,
    };
    this.$nextTick(() => {
      this.loaded = true;
    });
  },
  methods: {
    async updateAttacker() {
      await api().put(`/catapoints/${this.attacker._id}`, this.mutableAttacker);
      this.$store.dispatch('updateCycle');
    },
    async deleteAttacker() {
      window.VoerroModal.show({
        title: 'Confirm:',
        body: `Delete (${this.attacker.xCoord}|${this.attacker.yCoord})?`,
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Delete',
            handler: async () => {
              await api().delete(`/catapoints/${this.attacker._id}`);
              this.$store.dispatch('updateCycle');
            },
          },
        ],
      });
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

.coord_box {
  width: 42px;
  margin-right: 15px;
}

.player_name {
  width: 10%;
}

.coords {
  width: 8%;
  text-align: center;
  padding-right: 5px;
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

.delete_button {
  width: 5%;
  height: 17px;
  margin: 1px 20px;
  font-size: 0.9em;
  text-align: center;
  border: 1px solid #666666;
  background: #f4ebf0;
  cursor: pointer;
}
</style>
