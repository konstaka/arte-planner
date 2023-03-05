const NE = [];
const SE = [];
const SW = [];
const NW = [];

const make_quads = () => {
  for (let i = 0; i <= 200; i++) {
    NE.push([]);
    SE.push([]);
    SW.push([]);
    NW.push([]);
    for (let j = 0; j <= 200; j++) {
      NE[i].push('[ ]');
      SE[i].push('[ ]');
      SW[i].push('[ ]');
      NW[i].push('[ ]');
    }
  }
  for (let i = 0; i <= 200; i++) {
    for (let j = 0; j <= 200; j++) {
      // origo
      if (i === 0 && j === 0) {
        NE[200 - i][j] = '[0]';
        SE[i][j] = '[0]';
        SW[i][200 - j] = '[0]';
        NW[200 - i][200 - j] = '[0]';
      }
      // greyzone
      if (Math.sqrt(i ** 2 + j ** 2) < 25) {
        NE[200 - i][j] = '[o]';
        SE[i][j] = '[o]';
        SW[i][200 - j] = '[o]';
        NW[200 - i][200 - j] = '[o]';
      }
      // own territory
      if (Math.sqrt((200 - i) ** 2 + (200 - j) ** 2) < 60) {
        NE[200 - i][j] = '[+]';
        SE[i][j] = '[+]';
        SW[i][200 - j] = '[+]';
        NW[200 - i][200 - j] = '[+]';
      }
      // artefact radii
      // SA    251
      // SB    227
      // SE    100
      // SD    200
      // ST    177
      // SS    151
      // SC    126
      // SF    188
      // LA    75
      // LB    94
      // LE    186
      // LD    112
      // LT    130
      // LS    150
      // LC    168
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 251) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 227) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 100) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 200) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 177) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 151) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 126) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 186) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      // special squares
      if (i === 189 && j === 138) {
        NE[200 - i][j] = '[M]';
      }
      if (i === 190 && j === 120) {
        NE[200 - i][j] = '[M]';
      }
    }
  }
};

const print_quad = (quad) => {
  for (let i = 0; i < quad.length; i++) {
    console.log(quad[i].join(''));
  }
};

const print_map_200_centered = () => {
  for (let i = 0; i < SE.length; i++) {
    let row = SE[i].join('');
    row += '  ';
    row += SW[i].join('');
    console.log(row);
  }
  console.log();
  for (let i = 0; i < NE.length; i++) {
    let row = NE[i].join('');
    row += '  ';
    row += NW[i].join('');
    console.log(row);
  }
};

make_quads();
print_map_200_centered();
