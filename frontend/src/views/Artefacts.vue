<template>
  <div class="wrapper">
    <div class="attacker_row">
      <div class="data_item player_name">
        Page source
        <input v-model="pageSource" class="coord_box" />
      </div>
      <div class="data_item add_button" @click="parseSmall">Parse small</div>
      <div class="data_item add_button" @click="parseLarge">Parse large</div>
    </div>
  </div>
</template>

<script>
import { mapIdtoCoordinates } from '@/util/mapId';
// import api from '@/util/api';
export default {
  name: 'Artefacts',
  data: () => ({
    pageSource: '',
    types: {
      type1: 'buildingplan',
      type2: 'architect',
      type4: 'boots',
      type5: 'eyes',
      type6: 'diet',
      type8: 'trainer',
      type9: 'storage',
      type10: 'confusion',
      typeFool: 'fool',
    },
  }),
  methods: {
    /**
     * @param source:
     * type2" title="The architects&#39; slight secret  VII"/></td>
     * <td class="nam"><a href="/build.php?gid=27&amp;s=1&amp;show=7">The architects&#39; slight secret  VII</a>
     *  <span class="bon">(&#x202d;&#x202d;4&#x202c;&times;&#x202c;)</span><div class="info">Treasury <b>10</b>,
     * Effect <b>Village</b></div></td>             <td class="pla"><a href="/karte.php?d=375264">SENSUELL</a></td>
     *       <td class="al"><a href="/alliance/8">IKEA</a></td>             <td class="dist">66</td>         </tr>
     *     <tr>             <td class="icon"><i class="
     * @param parseSize: small|large
     * @returns Artefact
     *  // X-coordinate: NUM(-400 ... 400)
     *  xCoord: Number,
     *  // Y-coordinate: NUM(-400 ... 400)
     *  yCoord: Number,
     *  // Type: architect | boots | eyes | diet | trainer | storage | confusion | fool
     *  type: String,
     *  // Size: small | large | unique
     *  size: String,
     */
    readArtefact(source, parseSize) {
      if (!source || !source.includes('type')) {
        return null;
      }

      const htmlType = source.substring(
        source.indexOf('type'),
        source.indexOf('"')
      );
      const type = this.types[htmlType];
      if (!type || type === 'buildingplan') {
        return null;
      }

      let size = parseSize;
      if (size === 'large' && source.toLowerCase().includes('unique ')) {
        size = 'unique';
      }

      const beginMapId = source.indexOf('/karte.php?d=') + 13;
      const mapIdLength = source.substr(beginMapId).indexOf('"');
      const mapId = source.substr(beginMapId, mapIdLength);
      const { x: xCoord, y: yCoord } = mapIdtoCoordinates(
        mapId,
        801 // TEST VALUE
        // this.$store.state.serverConfig.size * 2 + 1
      );

      return { xCoord, yCoord, type, size };
    },
    async parse(parseSize) {
      const artefactSources = this.pageSource.split('artefactIcon');
      for (const source of artefactSources) {
        const parsedArtefact = this.readArtefact(source, parseSize);
        if (parsedArtefact) {
          console.log(parsedArtefact);
          // await api().put('/artefacts', parsedArtefact);
        }
      }
      this.$store.dispatch('updateCycle');
    },
    async parseSmall() {
      await this.parse('small');
    },
    async parseLarge() {
      await this.parse('large');
    },
  },
};
</script>

<style scoped>
.wrapper {
  margin-bottom: 300px;
}

@media screen and (max-width: 1330px) {
  .wrapper {
    overflow-x: scroll;
  }
}

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

.inputs {
  width: 12%;
  text-align: right;
  padding-right: 5px;
  position: relative;
}

.player_name {
  width: 10%;
}

.coord_box {
  width: 42px;
  margin-right: 15px;
  position: initial;
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
