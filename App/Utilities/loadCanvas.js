const Game = require('./generateMap');
const SpriteLoader = require('./spriteLoader');
const WeaponLoader = require('./weaponLoader');
const Fight = require('./fight');

let player = {};

function showWin(context) {
  context.clearRect(0, 0, 800, 600);

  context.font = '100px "Special Elite"';
  context.fillText('You Win', 220, 100);

  context.font = '35px "Special Elite';
  context.fillText('Press Enter', 300, 335);
}

function showLose(context) {
  context.clearRect(0, 0, 800, 600);

  context.font = '100px "Special Elite"';
  context.fillText('You Lose', 200, 100);

  context.strokeRect(275, 300, 250, 50);

  context.font = '35px "Special Elite';
  context.fillText('Press Enter', 300, 335);
}

function loadGameUI(context) {
  const barWidth = 330;
  const health = (player.health / player.maxHealth) * barWidth;
  const experience = (player.experience / player.nextLevel) * barWidth;
  let mobHealth = 0;
  let mobMaxHealth = 0;
  let mobHealthPercent = 0;

  if (player.currentFoe !== null) {
    mobHealth = player.currentFoe.health;
    mobMaxHealth = player.currentFoe.maxHealth;
    mobHealthPercent = (mobHealth / mobMaxHealth) * barWidth;
  }

  context.clearRect(451, 0, 349, 600);

  /*****************************************
  *
  *                 Target
  *
  ******************************************/

  // Label
  context.fillStyle = 'black';
  context.font = '38px "Special Elite"';
  context.fillText('Target', 460, 60);

  // Bar
  context.strokeStyle = 'black';
  context.strokeRect(460, 70, barWidth, 30);

  // Bar Fill
  context.fillStyle = 'blue';
  context.fillRect(460, 71, mobHealthPercent, 28);

  /*****************************************
  *
  *               Health
  *
  ******************************************/

  // Bar Label
  context.fillStyle = 'black';
  context.font = '38px "Special Elite"';
  context.fillText('Health', 460, 150);


  // Bar
  context.strokeRect(460, 165, 330, 30);

  // Bar Fill
  context.fillStyle = 'red';
  context.fillRect(460, 166, health, 28);

  /*****************************************
  *
  *               Experience
  *
  ******************************************/

  // Bar Label
  context.fillStyle = 'black';
  context.font = '38px "Special Elite"';
  context.fillText('Experience', 460, 250);

  // Bar
  context.strokeRect(460, 265, 330, 30);

  // Bar Fill
  context.fillStyle = 'green';
  context.fillRect(460, 266, experience, 28);

  /*****************************************
  *
  *             Equip / Level
  *
  ******************************************/

  // Level
  context.fillStyle = 'black';
  context.font = '38px "Special Elite"';
  context.fillText('Level ' + player.level, 460, 370);

  // Weapon
  context.fillText(player.weapon.displayName, 460, 420);
}

function drawViewport(context) {
  const keys = Object.keys(Game.map);
  let playerLocation = [];

  keys.forEach( (key) => {
    if (Game.map[key] === 'player') {
      playerLocation = key.split(',');
    }
  });

  player.x = parseInt(playerLocation[0]);
  player.y = parseInt(playerLocation[1]);

  for (let y = -4; y < 5; y++) {
    for (let x = -4; x < 5; x++) {
      const location = (player.x + x) + ',' + (player.y + y);
      const spawnX = 200 + (x * 50);
      const spawnY = 200 + (y * 50);

      if (keys.indexOf(location) > -1) {
        if (Game.map[location] === 'door') {
          SpriteLoader.loadDoor(context, spawnX, spawnY);
        } else {
          if (player.dungeonLevel ===4) {
            SpriteLoader.loadTile2(context, spawnX, spawnY);
          } else {
            SpriteLoader.loadTile(context, spawnX, spawnY);
          }
        }

        /***********************************
        *
        *           Items / Weapons
        *
        ************************************/

        switch (Game.map[location]) {
          case 'health':
            SpriteLoader.loadHealth(context, spawnX, spawnY);
            break;
          case 'bat':
            SpriteLoader.ground.loadBat(context, spawnX, spawnY);
            break;
          case 'axe':
            SpriteLoader.ground.loadAxe(context, spawnX, spawnY);
            break;
          case 'katanas':
            SpriteLoader.ground.loadKatanas(context, spawnX, spawnY);
            break;
          case 'saw':
            SpriteLoader.ground.loadSaw(context, spawnX, spawnY);
            break;

        /***********************************
        *
        *               Mobs
        *
        ************************************/

          case 'alien':
            SpriteLoader.loadAlien(context, spawnX, spawnY);
            break;
          case 'cat':
            SpriteLoader.loadCat(context, spawnX, spawnY);
            break;
          case 'ninja':
            SpriteLoader.loadNinja(context, spawnX, spawnY);
            break;
          case 'clown':
            SpriteLoader.loadClown(context, spawnX, spawnY);
            break;
          case 'boss1':
            SpriteLoader.loadBoss(context, spawnX, spawnY);
            break;
          case 'boss2':
            SpriteLoader.loadBoss(context, 150 + (x * 50), 200 + (y * 50));
            break;
          case 'boss3':
            SpriteLoader.loadBoss(context, 200 + (x * 50), 150 + (y * 50));
            break;
          case 'boss4':
            SpriteLoader.loadBoss(context, 150 + (x * 50), 150 + (y * 50));
            break;
          case 'eye':
            SpriteLoader.loadEye(context, spawnX, spawnY);
            break;
          default:
            break;
        }

      } else {
        if (player.dungeonLevel === 4) {
          SpriteLoader.loadWall2(context, spawnX, spawnY);
        } else {
          SpriteLoader.loadWall(context, spawnX, spawnY);
        }
      }
    }
  }

  SpriteLoader.loadChicken(context, player);
  loadGameUI(context);
}

function Move(context, keyCode) {
  const keys = Object.keys(Game.map);
  const weapons = ['bat', 'axe', 'katanas', 'saw'];
  const mobs = ['alien', 'cat', 'ninja', 'clown', 'boss1', 'boss2', 'boss3', 'boss4', 'eye'];

  let currentLocation = player.x + ',' + player.y;
  let newLocation = '';

  switch (keyCode) {  
    case 65:  
    case 37:
     newLocation = (player.x - 1) + ',' + player.y;
     break;
    case 87:
    case 38:
      newLocation = player.x + ',' + (player.y - 1);
      break;
    case 68:
    case 39:
      newLocation = (player.x + 1) + ',' + player.y;
      break;
    case 83:
    case 40:
      newLocation =  player.x + ',' + (player.y + 1);
      break;
    default:
      break;
  }

  if (keys.indexOf(newLocation) > -1) {
    if (Game.map[newLocation] === 'door') {
      player.dungeonLevel++;
      Game.nextDungeon(player.dungeonLevel);
    } else if (mobs.indexOf(Game.map[newLocation]) > -1) {
      Fight(newLocation, player, Game.map, context);
    } else {
      if (Game.map[newLocation] === 'health') {
        healthPot(context);
      } else if (weapons.indexOf(Game.map[newLocation]) > -1) {
        loadWeapon(Game.map[newLocation], context);
      }

      if (player.dungeonLevel === 4) {
        Game.map[currentLocation] = 'tile2';
      } else {
        Game.map[currentLocation] = 'tile';
      }

      Game.map[newLocation] = 'player';
    }

    if (player.gameRunning) drawViewport(context);
  }
}

function healthPot(context) {
  const potValue = (player.dungeonLevel + 1) * 35;

  if (player.health < player.maxHealth) {
    if (player.health + potValue >= player.maxHealth) {
      player.health = player.maxHealth;
    } else {
      player.health += potValue;
    }
  }

  loadGameUI(context);
}

function loadWeapon(weapon, context) {

  WeaponLoader.loadWeapon(weapon, context);
  player.weapon = WeaponLoader.equip;
}

function startNewGame(context) {
  player = {
    x: null,
    y: null,
    health: 100,
    maxHealth: 100,
    level: 0,
    experience: 0,
    nextLevel: 100,
    weapon: {},
    dungeonLevel: 0,
    currentFoe: null,
    bossEyeCount: 4,
    gameRunning: true,

    levelUp: function () {
      const healthPercent = this.health / this.maxHealth;

      this.level++;
      this.experience = 0;
      this.maxHealth += 150;
      this.health = this.maxHealth * healthPercent;
      this.nextLevel += 250;
    },

    endGame: function (win, context) {
      if (win) {
        this.gameRunning = false;
        showWin(context);
      } else {
        this.gameRunning = false;
        showLose(context);
      }
    }
  }

  Game.nextDungeon(player.dungeonLevel);
  WeaponLoader.loadWeapon('fist');
  player.weapon = WeaponLoader.equip;
  drawViewport(context);
}

module.exports = () => {
  const canvas = document.querySelector('#game');
  const context = canvas.getContext('2d');

  startNewGame(context);

  window.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      if (!player.gameRunning) startNewGame(context);
    } else {
      Move(context, event.keyCode);
    }
  });
}
