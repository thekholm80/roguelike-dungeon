module.exports = {

  mob: {},

  generateMob: function (dungeonLevel, location, mobType) {
    const boss = ['boss1', 'boss2', 'boss3', 'boss4'];

    if (boss.indexOf(mobType) > -1) {
      this.spawnBoss(location, mobType);
    } else {
      this.mob.health = 30 * (dungeonLevel + 1);
      this.mob.maxHealth = 30 * (dungeonLevel + 1);
      this.mob.damage = 15 * (dungeonLevel + 1);
      this.mob.location = location;
      this.mob.experience = 30 * (dungeonLevel + 1);
      this.mob.type = mobType;
    }
  },

  spawnBoss: function (location, mobType) {
    this.mob.health = 1200;
    this.mob.maxHealth = 1200;
    this.mob.damage = 200;
    this.mob.location = location;
    this.mob.experience = 0;
    this.mob.type = 'boss';
  }
}
