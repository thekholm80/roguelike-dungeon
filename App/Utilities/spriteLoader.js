const WeaponLoader = require('./weaponLoader');

module.exports = {

  /***********************************
  *
  *    Floors, Walls and Doors
  *
  ************************************/

  loadTile2: function (context, x, y) {
    const tile = require('../Assets/Images/tile.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = tile;
  },

  loadTile: function (context, x, y) {
    const tile = require('../Assets/Images/tile2.png');
    const sprite = new Image();

    sprite.onload = function () {
      context.drawImage(sprite, x, y);
    }

    sprite.src = tile;
  },

  loadWall2: function (context, x, y) {
    const wall = require('../Assets/Images/wall2.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = wall;
  },

  loadWall: function (context, x, y) {
    const wall = require('../Assets/Images/wall.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = wall;
  },

  loadDoor: function (context, x, y) {
    const door = require('../Assets/Images/door.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = door;
  },

  /***********************************
  *
  *               Mobs
  *
  ************************************/

  loadAlien: function (context, x, y) {
    const alien = require('../Assets/Images/alien.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = alien;
  },

  loadCat: function (context, x, y) {
    const cat = require('../Assets/Images/cat.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = cat;
  },

  loadNinja: function (context, x, y) {
    const ninja = require('../Assets/Images/ninja.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = ninja;
  },

  loadClown: function (context, x, y) {
    const clown = require('../Assets/Images/clown.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = clown;
  },

  loadBoss: function (context, x, y) {
    const boss = require('../Assets/Images/boss.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = boss;
  },

  loadEye: function (context, x, y) {
    const eye = require('../Assets/Images/eye.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = eye;
  },


  /***********************************
  *
  *         Hero & Health
  *
  ************************************/

  loadHealth: function (context, x, y) {
    const health = require('../Assets/Images/health.png');
    const sprite = new Image();

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = health;
  },

  loadChicken: function (context, player) {
    const chicken = require('../Assets/Images/chicken.png');
    const sprite = new Image();
    const x = 200;
    const y = 200;

    sprite.onload = () => {
      context.drawImage(sprite, x, y);
    }

    sprite.src = chicken;

    this.drawWeapon(context, player);
  },

  /***********************************
  *
  *             Weapons
  *
  ************************************/

  equip: {

    loadAxe: function (context) {
      const axe = require('../Assets/Images/axe.png');
      const sprite = new Image();
      const x = 200;
      const y = 200;

      sprite.onload = () => {
        context.drawImage(sprite, x, y);
      }

      sprite.src = axe;
    },

    loadBat: function (context) {
      const bat = require('../Assets/Images/bat.png');
      const sprite = new Image();
      const x = 200;
      const y = 200;

      sprite.onload = () => {
        context.drawImage(sprite, x, y);
      }

      sprite.src = bat;
    },

    loadKatanas: function (context) {
      const katanas = require('../Assets/Images/katanas.png');
      const sprite = new Image();
      const x = 200;
      const y = 200;

      sprite.onload = () => {
        context.drawImage(sprite, x, y);
      }

      sprite.src = katanas;
    },

    loadSaw: function (context) {
      const saw = require('../Assets/Images/saw.png');
      const sprite = new Image();
      const x = 200;
      const y = 200;

      sprite.onload = () => {
        context.drawImage(sprite, x, y);
      }

      sprite.src = saw;
    }
  },

  ground: {

    loadBat: function (context, x, y) {
      const bat = require('../Assets/Images/ground_bat.png');
      const sprite = new Image();

      sprite.onload = () => {
        context.drawImage(sprite, x, y);
      }

      sprite.src = bat;
    },

    loadAxe: function (context, x, y) {
      const axe = require('../Assets/Images/ground_axe.png');
      const sprite = new Image();

      sprite.onload = () => {
        context.drawImage(sprite, x, y);
      }

      sprite.src = axe;
    },

    loadKatanas: function (context, x, y) {
      const katanas = require('../Assets/Images/ground_katanas.png');
      const sprite = new Image();

      sprite.onload = () => {
        context.drawImage(sprite, x, y);
      }

      sprite.src = katanas;
    },

    loadSaw: function (context, x, y) {
      const saw = require('../Assets/Images/ground_saw.png');
      const sprite = new Image();

      sprite.onload = () => {
        context.drawImage(sprite, x, y);
      }

      sprite.src = saw;
    }
  },

  drawWeapon: function (context, player) {
    switch (player.weapon.name) {
      case 'bat':
        this.equip.loadBat(context);
        break;

      case 'axe':
        this.equip.loadAxe(context);
        break;

      case 'katanas':
        this.equip.loadKatanas(context);
        break;

      case 'saw':
        this.equip.loadSaw(context);
        break;

      default:
        return;
    }
  }
}
