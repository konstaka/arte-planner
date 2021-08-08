<template>
  <div class="attacker_row">
    <div class="data_item player_name">
      {{ capitalise(artefact.size) }} {{ capitalise(artefact.type) }} ({{
        artefact.xCoord
      }}|{{ artefact.yCoord }})
    </div>
    <div class="data_item attacker">
      SWEEP: {{ artesweep.player }} ({{ artesweep.xCoord }}|{{
        artesweep.yCoord
      }})
    </div>
    <div class="data_item attacker">
      CATAPOINT: {{ catapoint.player }} ({{ catapoint.xCoord }}|{{
        catapoint.yCoord
      }})
    </div>
    <div class="data_item attacker">
      TREASURY: {{ treasury.player }} ({{ treasury.xCoord }}|{{
        treasury.yCoord
      }})
    </div>
    <div class="data_item delete_button" @click="deleteCommand">Delete</div>
  </div>
</template>

<script>
import api from '@/util/api';
import { capitalise } from '@/util/stringUtils';
export default {
  name: 'CommandRow',
  props: ['command'],
  computed: {
    artefact() {
      return this.$store.state.artefacts.find(
        storedArte => storedArte._id === this.command.artefactId
      );
    },
    artesweep() {
      return this.$store.state.commandedArtesweeps.find(
        storedArtesweep => storedArtesweep._id === this.command.artesweepId
      );
    },
    catapoint() {
      return this.$store.state.commandedCatapoints.find(
        storedCatapoint => storedCatapoint._id === this.command.catapointId
      );
    },
    treasury() {
      return this.$store.state.commandedTreasuries.find(
        storedTreasury => storedTreasury._id === this.command.treasuryId
      );
    },
  },
  methods: {
    capitalise(string) {
      if (!string) return '';
      return capitalise(string);
    },
    async deleteCommand() {
      window.VoerroModal.show({
        title: 'Confirm:',
        body: `Delete command for ${capitalise(
          this.artefact.size
        )} ${capitalise(this.artefact.type)} (${this.artefact.xCoord}|${
          this.artefact.yCoord
        })?
        Note: This won't notify Discord.`,
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'Delete',
            handler: async () => {
              await api().delete(`/commands/${this.command._id}`);
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

.player_name {
  width: 15%;
}

.attacker {
  width: 21%;
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

.without_hero {
  width: 11%;
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
