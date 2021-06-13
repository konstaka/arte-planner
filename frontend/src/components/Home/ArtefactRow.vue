<template>
  <div class="command_row">
    <div class="data_item coords">
      {{ artefact.xCoord }}|{{ artefact.yCoord }}
    </div>
    <div class="data_item arte_name">
      {{ capitalise(artefact.size) }} {{ capitalise(artefact.type) }}
    </div>
  </div>
</template>

<script>
import { capitalise } from '@/util/stringUtils';
import { coordinatesToMapId } from '@/util/mapId';
export default {
  name: 'CommandRow',
  props: ['artefact'],
  data: () => ({
    options: {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    },
  }),
  computed: {
    shortestTime() {
      return new Date().toLocaleTimeString('en-GB', this.options);
    },
    shortestTimeWithSelections() {
      return new Date().toLocaleTimeString('en-GB', this.options);
    },
    timeLostWithSelections() {
      return new Date().toLocaleTimeString('en-GB', this.options);
    },
  },
  methods: {
    coordId(x, y) {
      return coordinatesToMapId(
        x,
        y,
        this.$store.state.serverConfig.size * 2 + 1
      );
    },
    capitalise(str) {
      return capitalise(str);
    },
  },
};
</script>

<style scoped>
.command_row {
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

.coords {
  width: 6%;
}

.arte_name {
  width: 10%;
}

.player_name a,
.send_link a {
  color: #2c3e50;
}

.sending_time {
  width: auto;
  margin-right: 10px;
}

.scout_send {
  width: 215px;
}

.return_time {
  width: 185px;
}

.ghost_send {
  width: 215px;
  margin-left: 30px;
}

.send_link {
  width: auto;
}
</style>
