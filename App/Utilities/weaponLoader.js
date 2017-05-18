module.exports = {

  equip: {
    displayName: '',
    name: '',
    damage: 0
  },

  loadWeapon: function (weapon, context) {
    switch (weapon) {
      case 'fist':
        this.loadFist();
        break;
      case 'bat':
        this.loadBat(context);
        break;
      case 'axe':
        this.loadAxe(context);
        break;
      case 'katanas':
        this.loadKatanas(context);
        break;
      case 'saw':
        this.loadSaw(context);
        break;
      default:
        console.error('weaponLoader.js loadWeapon() error');
    }
  },

  loadFist: function () {

    this.equip.displayName = 'Chicken Fists';
    this.equip.name = 'fist';
    this.equip.damage = 15;
  },

  loadBat: function (context) {

    this.equip.displayName = 'Baseball Bat';
    this.equip.name = 'bat';
    this.equip.damage = 23;
  },

  loadAxe: function (context) {

    this.equip.displayName = 'Battle Axe';
    this.equip.name = 'axe';
    this.equip.damage = 28;
  },

  loadKatanas: function (context) {
    this.equip.displayName = 'Dual Katanas';
    this.equip.name = 'katanas';
    this.equip.damage = 32;
  },

  loadSaw: function (context) {
    this.equip.displayName = 'Chain Saw';
    this.equip.name = 'saw';
    this.equip.damage = 40;
  }
}
