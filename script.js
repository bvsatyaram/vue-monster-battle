var AppUtis = {
  randNumber: function(max) {
    return Math.floor(Math.random() * max) + 1;
  },
  normalizeNumber: function(num, min, max) {
    if (num < min) {
      num = min;
    } else if (num > max) {
      num = max;
    }

    return num;
  }
}

new Vue({
  el: '#app',
  data: {
    gameOn: false
  },
  computed: {
    normalizedHealth: function() {
      this.health.me = AppUtis.normalizeNumber(this.health.me, 0, 100);
      this.health.monster = AppUtis.normalizeNumber(this.health.monster, 0, 100);
      return {
        me:  this.health.me,
        monster: this.health.monster
      }
    }
  },
  methods: {
    attack: function() {
      this.health.me -= AppUtis.randNumber(10);
      this.health.monster -= AppUtis.randNumber(10);
    },
    heal: function() {
      this.health.me += AppUtis.randNumber(10);
      this.health.me -= AppUtis.randNumber(10);
    },
    startGame: function() {
      this.health = {
        me: 100,
        monster: 100
      };
      this.gameOn = true;
    },
    endGame: function() {
      this.gameOn = false;
    }
  }
})