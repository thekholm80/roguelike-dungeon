const Game = {
  map: {},
  x: 90,
  y: 90,

  nextDungeon: function (dungeonLevel) {

    if (dungeonLevel < 4) {
      this.generateMap(dungeonLevel);
    } else {
      this.spawnBoss();
    }

  },

  generateMap: function (dungeonLevel) {
    const digger = new ROT.Map.Digger(this.x, this.y);
    const freeCells = [];

    this.map = {};

    const diggerCallback = (x, y, value) => {

      if (value) return;

      let key = x + ',' + y;

      this.map[key] = 'tile';
      freeCells.push(key);
    }

    digger.create(diggerCallback.bind(this));

    this.generateHealth(freeCells);
    this.addPlayer(freeCells);
    this.addMobs(freeCells, dungeonLevel);
    this.addWeapon(freeCells, dungeonLevel);
    this.addDoor();
  },

  generateHealth: function (freeCells) {

    for (let i = 0; i < 40; i++) {
      const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      const key = freeCells.splice(index, 1)[0];

      this.map[key] = 'health';
    }
  },

  addPlayer: function (freeCells) {
    const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    const key = freeCells.splice(index, 1)[0];

    this.map[key] = 'player';
  },

  addMobs: function (freeCells, dungeonLevel) {
    const mobs = ['alien', 'cat', 'ninja', 'clown'];
    const mobCount = (dungeonLevel * 5) + 50;

    for (let i = 0; i < mobCount; i++) {
      const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      const key = freeCells.splice(index, 1)[0];

      this.map[key] = mobs[dungeonLevel];
    }
  },

  addWeapon: function (freeCells, dungeonLevel) {
    const weapons = ['bat', 'axe', 'katanas', 'saw'];
    const index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    const key = freeCells.splice(index, 1)[0];

    this.map[key] = weapons[dungeonLevel];
  },

  addDoor: function () {
    const keys = Object.keys(this.map);
    let placed = false;

    while (!placed) {
      const index = Math.floor(Math.random() * keys.length);
      const key = keys[index].split(',');
      const tryForWall = key[0] + ',' + (key[1] - 1);

      if (keys.indexOf(tryForWall) === -1) {
        this.map[tryForWall] = 'door';
        placed = !placed;
      }
    }
  },

  spawnBoss: function () {
    const freeCells = [];

    this.map = {};

    for (let y = 1; y < 20; y++) {
      for (let x = 1; x < 15; x++) {
        this.map[x + ',' + y] = 'tile2';
        freeCells.push(x + ',' + y);
      }
    }

    for (let x = 1; x < 20; x++) {
      this.map[x + ',20'] = 'tile2';
      freeCells.push(x + ',' + 20);
    }

    this.generateHealth(freeCells);

    this.map['4,2'] = 'eye';
    this.map['9,2'] = 'eye';
    this.map['6,3'] = 'boss1';
    this.map['7,3'] = 'boss2';
    this.map['6,4'] = 'boss3';
    this.map['7,4'] = 'boss4';
    this.map['4,5'] = 'eye';
    this.map['9,5'] = 'eye';
    this.map['20,20'] = 'player';
  }
}

module.exports = Game;
