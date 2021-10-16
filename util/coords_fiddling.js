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
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 240) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
      }
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 220) {
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
      if (Math.round(Math.sqrt(i ** 2 + j ** 2)) === 180) {
        NE[200 - i][j] = '[X]';
        SE[i][j] = '[X]';
        SW[i][200 - j] = '[X]';
        NW[200 - i][200 - j] = '[X]';
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
