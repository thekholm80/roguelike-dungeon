const MobLoader = require('./mobLoader');

function fight(location, player, map, context) {
  const mob = player.currentFoe;
  const boss = ['boss1', 'boss2', 'boss3', 'boss4'];

  if (mob) {
    if (mob.location === location) {
      hit(player, map, context);
    } else {
      if (mob.type === 'boss' && boss.indexOf(map[location]) > -1) {
        hit(player, map, context);
      } else {
        newFight(location, player, map);
      }
    }
  } else {
    newFight(location, player, map);
  }
}

function newFight(location, player, map) {
  MobLoader.generateMob(player.dungeonLevel, location, map[location]);
  player.currentFoe = MobLoader.mob;
  fight(location, player, map);
}

function hit(player, map, context) {
  let playerHit = Math.floor(Math.random() * (player.level + 1 + player.weapon.damage));
  const mobHit = Math.floor(Math.random() * player.currentFoe.damage);
  const boss = ['boss1', 'boss2', 'boss3', 'boss4'];

  if (player.currentFoe.type === 'boss' && player.bossEyeCount > 0) {
    playerHit = 0;
  }

  if (player.currentFoe.health - playerHit <= 0) {
    if (player.experience + player.currentFoe.experience >= player.nextLevel) {
      player.levelUp();
    } else {
      Math.floor(player.experience += player.currentFoe.experience);
    }

    if (player.currentFoe.type === 'boss') {
      player.endGame(true, context);
    } else if (player.currentFoe.type === 'eye') {
      player.bossEyeCount--;
      map[player.currentFoe.location] = 'tile';
      player.currentFoe = null;
    } else {
      map[player.currentFoe.location] = 'tile';
      player.currentFoe = null;
    }
  } else {
    Math.floor(player.currentFoe.health -= playerHit);
    if (player.health - mobHit <= 0) {
      player.endGame(false, context);
    } else {
      Math.floor(player.health -= mobHit);
    }
  }
}

module.exports = fight;
